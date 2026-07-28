import Fastify from 'fastify';
import cors from '@fastify/cors';
import { healthRoutes } from './routes/health';

export async function buildApp() {
  const app = Fastify({
    logger: true,
  });

  // Register CORS
  const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173';
  await app.register(cors, {
    origin: [frontendUrl],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    credentials: true,
  });

  // Register routes
  await app.register(healthRoutes, { prefix: '/api' });

  return app;
}
