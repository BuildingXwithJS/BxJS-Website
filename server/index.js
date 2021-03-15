const fastify = require('fastify');
const Next = require('next');

const server = fastify({ logger: { level: 'error' } });

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';

server.register(async (instance, opts, next) => {
  const app = Next({ dev });
  const handle = app.getRequestHandler();
  await app.prepare();

  if (dev) {
    instance.get('/_next/*', (req, reply) => {
      return handle(req.req, reply.res).then(() => {
        reply.sent = true;
      });
    });
  }

  instance.all('/*', (req, reply) => {
    return handle(req.req, reply.res).then(() => {
      reply.sent = true;
    });
  });

  instance.setNotFoundHandler((request, reply) => {
    return app.render404(request.req, reply.res).then(() => {
      reply.sent = true;
    });
  });

  next();
});

server.listen(port, (err) => {
  if (err) throw err;
  console.log(`> Ready on http://localhost:${port}`);
});
