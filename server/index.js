const fastify = require('fastify')({logger: {level: 'error'}});
const Next = require('next');
const githubRoutes = require('./github');

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';

fastify.register(githubRoutes, {prefix: '/api'});

fastify.register(async (fastify, opts, next) => {
  const app = Next({dev});
  await app.prepare();
  if (dev) {
    fastify.get('/_next/*', async (req, reply) => {
      await app.handleRequest(req.req, reply.res);
      reply.sent = true;
    });
  }

  fastify.get('/weekly/:file', async (req, reply) => {
    await app.render(req.req, reply.res, '/weekly', {...req.query, file: req.params.file});
    reply.sent = true;
  });

  fastify.get('/*', async (req, reply) => {
    await app.handleRequest(req.req, reply.res);
    reply.sent = true;
  });

  fastify.setNotFoundHandler(async (request, reply) => {
    await app.render404(request.req, reply.res);
    reply.sent = true;
  });

  next();
});

module.exports = () =>
  fastify.listen(port, err => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
