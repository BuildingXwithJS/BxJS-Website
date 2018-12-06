const fetch = require('isomorphic-unfetch');
const LRU = require('lru-cache');

const baseUrl = 'https://api.github.com/repos/BuildingXwithJS/bxjs-weekly';
const episodesList = `${baseUrl}/contents/links`;

module.exports = function(fastify, opts, next) {
  const episodesCache = new LRU({
    max: 1, // max cache 1 item
    maxAge: 1000 * 60 * 60 * 24, // 1 day
  });

  fastify.get('/episodes', async (req, reply) => {
    const episodes = episodesCache.get('episodes');
    if (episodes) {
      reply.send(episodes);
      return;
    }

    const res = await fetch(episodesList).then(r => r.json());
    episodesCache.set('episodes', res);
    reply.send(res);
  });

  next();
};
