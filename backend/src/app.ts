import Fastify from 'fastify';
import { healthRoutes } from './routes/health';

export async function buildApp() {
  const app = Fastify({
    logger: true,
  });

  // Register routes
  app.register(healthRoutes, { prefix: '/api' });

  return app;
}
