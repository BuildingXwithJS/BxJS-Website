const mongoose = require('mongoose');
const {serverRuntimeConfig} = require('../env.config');

mongoose.set('useCreateIndex', true);

const db = mongoose.createConnection(serverRuntimeConfig.mongoUrl, {useNewUrlParser: true});

const ArticleSchema = new mongoose.Schema(
  {
    id: Number,
    category: String,
    title: {type: String, text: true},
    urls: {
      type: String,
      unique: true,
      validate: {
        validator: v => v && v.trim().length > 0,
        message: props => `${props.value} should not be empty!`,
      },
    },
    urlsSet: [String],
    filename: String,
    episodeName: String,
  },
  {strict: false}
);
const Article = db.model('Article', ArticleSchema);

exports.db = db;
exports.Article = Article;
