const fs = require('fs');
const path = require('path');
const fetch = require('isomorphic-unfetch');
const elasticlunr = require('elasticlunr');
const LRU = require('lru-cache');

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
    max: 1, // max cache 1 item
    maxAge: 1000 * 60 * 60 * 24, // 1 day
  });
  const releasesCache = new LRU({
    max: 1, // max cache 1 item
    maxAge: 1000 * 60 * 60 * 24 * 3, // 3 day
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
    const releasesFetched = releasesCache.get('release');
    if (releasesFetched) {
      reply.send('Cached');
      return;
    }

    // get latest release
    const [latestRelease] = await fetch(releasesUrl).then(r => r.json());
    // add to cache to make sure we do not check for
    // release more often than every 3 days
    releasesCache.set('release', latestRelease);

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
