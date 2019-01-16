module.exports = {
  serverRuntimeConfig: {
    webhookSecret: process.env.WEBHOOK_SECRET || '12345',
    mongoUrl: process.env.MONGO_URL || 'mongodb://localhost/bxjs',
  },
  publicRuntimeConfig: {
    baseUrl: process.env.BASE_URL || 'http://localhost:3000',
  },
};
