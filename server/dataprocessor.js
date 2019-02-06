const fetch = require('isomorphic-unfetch');
const {Article} = require('./db');

const baseUrl = 'https://api.github.com/repos/BuildingXwithJS/bxjs-weekly';
const releasesUrl = `${baseUrl}/releases`;

const process = async () => {
  // get latest release
  const [latestRelease] = await fetch(releasesUrl).then(r => r.json());

  // get download url
  const {assets} = latestRelease;
  const mainAsset = assets.find(asset => asset.name === 'bxjs.json');
  const {browser_download_url} = mainAsset;

  // write index to file
  const data = await fetch(browser_download_url).then(r => r.json());

  // get currently stored document urls
  const {results} = await Article.mapReduce({
    map: function() {
      emit(this._id, this.urls);
    },
    reduce: function(id, urls) {
      return urls;
    },
  });
  const urls = results.map(r => r.value);

  // filter fetched data using existing URLs
  const newData = data.filter(item => item.urls && !urls.includes(item.urls));

  // write data to mongodb
  await Promise.all(
    newData.map(async item => {
      const article = new Article(item);
      try {
        await article.save();
      } catch (e) {
        console.error(`
  --> Error saving item:
    [${item.urls}]:
      ${e.toString()}
`);
      }
    })
  );

  console.log('done writing articles to db');
  // TODO: schedule a worker to crawl new articles
  // and get tags, fulltext, etc
};

module.exports = process;
