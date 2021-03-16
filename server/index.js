import fastify from 'fastify';
import fastifyStatic from 'fastify-static';
import Next from 'next';
import path from 'path';
import { fileURLToPath } from 'url';
import { isConnected } from './db/index.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const server = fastify({ logger: { level: 'error' } });

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';

server.register(fastifyStatic, {
  root: path.join(__dirname, '..', 'public'),
  prefix: '/public/', // optional: default '/'
});

server.register(async (instance, opts, next) => {
  const app = Next({ dev });
  const handle = app.getRequestHandler();
  await app.prepare();

  // wait for DB connection
  await isConnected;

  if (dev) {
    instance.get('/_next/*', async (req, reply) => {
      await handle(req.raw, reply.res);
      reply.sent = true;
    });
  }

  instance.all('/*', async (req, reply) => {
    await handle(req.raw, reply.res);
    reply.sent = true;
  });

  instance.setNotFoundHandler(async (request, reply) => {
    await app.render404(request.req, reply.res);
    reply.sent = true;
  });

  next();
});

server.listen(port, (err) => {
  if (err) throw err;
  console.log(`> Ready on http://localhost:${port}`);
});
