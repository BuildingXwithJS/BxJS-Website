const {Article} = require('./db');
const stopWords = require('./stopwords');

const KEYWORD_THRESHOLD = 10;

module.exports = function(fastify, opts, next) {
  fastify.get('/keywords', async (req, reply) => {
    const articles = await Article.find({}, {keywords: 1});
    const keywordsMap = {};
    articles
      .map(article => article.keywords)
      .flat()
      .map(word => word.toLowerCase())
      .filter(word => !stopWords.includes(word))
      .filter(word => word.length > 2)
      .forEach(word => {
        if (keywordsMap[word]) {
          keywordsMap[word]++;
          return;
        }

        keywordsMap[word] = 1;
      });

    const result = Object.keys(keywordsMap)
      .map(keyword => ({
        keyword,
        count: keywordsMap[keyword],
      }))
      .sort((a, b) => b.count - a.count)
      .filter(it => it.count > KEYWORD_THRESHOLD);

    reply.send(result);
  });

  fastify.get('/articles/keywords/:word', async (req, reply) => {
    const word = req.params.word;
    const articles = await Article.find(
      {keywords: {$in: [new RegExp(word, 'i')]}},
      {
        category: 1,
        title: 1,
        urlsSet: 1,
        filename: 1,
        episodeName: 1,
        metadata: 1,
        keywords: 1,
      }
    );
    reply.send(articles);
  });

  next();
};
