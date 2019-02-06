const PQueue = require('p-queue');
const fetch = require('isomorphic-unfetch');
const domino = require('domino');
const {getMetadata} = require('page-metadata-parser');
const extractor = require('unfluff');
const retext = require('retext');
const keywords = require('retext-keywords');
const toString = require('nlcst-to-string');

// db model
const {Article} = require('./db');

// prepare retext
const retextProcessor = retext().use(keywords);
const stringify = value => toString(value);

// promisified keywords extraction function
const extractKeywords = text =>
  new Promise((resolve, reject) => {
    retextProcessor.process(text, (err, {data}) => {
      if (err) {
        reject(err);
        return;
      }

      const keywords = data.keywords.map(k => toString(k.matches[0].node));
      const keyphrases = data.keyphrases.map(p => p.matches[0].nodes.map(stringify).join(''));
      const result = [...new Set(keywords.concat(keyphrases))];
      resolve(result);
    });
  });

// sleep function
const sleep = time => new Promise(r => setTimeout(r, time));

// core crawl function
const crawl = async () => {
  const articles = await Article.find({fullHtml: {$exists: false}});

  for (const article of articles) {
    const url = article.urlsSet[0];
    const fullHtml = await fetch(url).then(r => r.text());

    // construct document from html
    const doc = domino.createWindow(fullHtml).document;

    // 1. extract meta tags
    const metadata = getMetadata(doc, url);

    // 2. run main context extraction
    const {text} = extractor(fullHtml);

    // 3. run tags / entities extraction on context
    const keywords = await extractKeywords(text);

    // construct results
    const data = {
      fullHtml,
      metadata,
      text,
      keywords,
    };
    // update document in db
    await Article.findByIdAndUpdate(article._id, {
      $set: data,
    });

    // sleep for 2s to evade bans
    await sleep(2000);
  }

  console.log('Done crawling execution');
};

// create new queue that is used by external callers
const queue = new PQueue({concurrency: 1});

module.exports = () => {
  queue.add(crawl);
};
