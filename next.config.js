const withCSS = require('@zeit/next-css');
const envConfig = require('./env.config');

module.exports = withCSS(envConfig);
