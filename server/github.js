const fetch = require('isomorphic-unfetch');
const LRU = require('lru-cache');
const snarkdown = require('snarkdown');
const verify = require('@octokit/webhooks/verify');
const {serverRuntimeConfig} = require('../env.config');
const processNewData = require('./dataprocessor');
const {Article} = require('./db');

const baseUrl = 'https://api.github.com/repos/BuildingXwithJS/bxjs-weekly';
const episodesListUrl = `${baseUrl}/contents/links`;

module.exports = function(fastify, opts, next) {
  const episodesCache = new LRU({
    maxAge: 1000 * 60 * 60 * 24, // 1 day
  });

  fastify.get('/episodes', async (req, reply) => {
    const episodes = episodesCache.get('episodes');
    if (episodes) {
      reply.send(episodes);
      return;
    }

    const res = await fetch(episodesListUrl).then(r => r.json());
    episodesCache.set('episodes', res);
    reply.send(res);
  });

  fastify.get('/episode', async (req, reply) => {
    const episodeUrl = req.query.url;
    const episodeData = episodesCache.get(episodeUrl);
    if (episodeData) {
      reply.send(episodeData);
      return;
    }

    const markdown = await fetch(episodeUrl).then(r => r.text());
    const html = snarkdown(markdown);
    const result = {markdown, html};
    episodesCache.set(episodeUrl, result);
    reply.send(result);
  });

  fastify.get('/search', async (req, reply) => {
    const query = req.query.q;

    const [titleResults, urlResults] = await Promise.all([
      Article.find({$text: {$search: query}}, {score: {$meta: 'textScore'}})
        .sort({
          score: {$meta: 'textScore'},
        })
        .limit(10),
      Article.find({urls: new RegExp(query)}).limit(5),
    ]);
    const titleUrls = titleResults.map(res => res.urls);
    const results = titleResults.concat(urlResults.filter(r => !titleUrls.includes(r.urls))).map(r => r.toObject());

    reply.send(results);
  });

  fastify.post('/update', async (req, reply) => {
    // validate hook
    const signature = req.headers['x-hub-signature'];
    const secret = serverRuntimeConfig.webhookSecret;
    const matchesSignature = verify(secret, req.body, signature);
    if (!matchesSignature) {
      console.error('Webhook called with wrong secret!');
      reply.code(401).send({error: 'Wrong secret'});
      return;
    }

    // trigger execution in the background
    processNewData();

    // tell github we're good
    reply.send('Done');
  });

  next();
};
