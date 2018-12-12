module.exports = {
  serverRuntimeConfig: {
    webhookSecret: process.env.WEBHOOK_SECRET || '12345',
  },
  publicRuntimeConfig: {
    baseUrl: process.env.BASE_URL || 'http://localhost:3000',
  },
};
