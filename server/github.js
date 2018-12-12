const fs = require('fs');
const path = require('path');
const fetch = require('isomorphic-unfetch');
const elasticlunr = require('elasticlunr');
const LRU = require('lru-cache');
const snarkdown = require('snarkdown');
const {serverRuntimeConfig} = require('../env.config');

const baseUrl = 'https://api.github.com/repos/BuildingXwithJS/bxjs-weekly';
const episodesListUrl = `${baseUrl}/contents/links`;
const releasesUrl = `${baseUrl}/releases`;

const indexPath = path.join(__dirname, '..', 'indexes', 'index.json');

const findInIndex = (url, index) => {
  const results = index.search(url, {
    fields: {
      title: {boost: 1},
      urls: {boost: 1},
    },
  });
  return results.slice(0, 10).map(({ref, score}) => ({
    ...index.documentStore.getDoc(ref),
    score,
  }));
};

module.exports = function(fastify, opts, next) {
  const episodesCache = new LRU({
    maxAge: 1000 * 60 * 60 * 24, // 1 day
  });

  // load search index
  let searchIndex = null;
  if (fs.existsSync(indexPath)) {
    searchIndex = elasticlunr.Index.load(JSON.parse(fs.readFileSync(indexPath).toString()));
  }

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

  fastify.get('/search', (req, reply) => {
    if (!searchIndex) {
      reply.send({error: 'No index found'});
      return;
    }

    const query = req.query.q;

    const results = findInIndex(query, searchIndex);

    reply.send(results);
  });

  fastify.get('/update', async (req, reply) => {
    // validate hook
    if (req.headers['x-hub-signature'] !== serverRuntimeConfig.webhookSecret) {
      console.error('Webhook called with wrong secret!');
      reply.code(401).send({error: 'Wrong secret'});
      return;
    }

    // get latest release
    const [latestRelease] = await fetch(releasesUrl).then(r => r.json());

    // get download url
    const {assets} = latestRelease;
    const [mainAsset] = assets;
    const {browser_download_url} = mainAsset;

    // write index to file
    const fileText = await fetch(browser_download_url).then(r => r.text());
    fs.writeFileSync(indexPath, fileText);

    // update in-memory index
    searchIndex = elasticlunr.Index.load(JSON.parse(fileText));

    reply.send('Done');
  });

  next();
};
