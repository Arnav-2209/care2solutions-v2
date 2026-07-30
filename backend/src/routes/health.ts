import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import { sql } from 'drizzle-orm';
import { getDb } from '../db';

export async function healthRoutes(app: FastifyInstance) {
  // Liveness check
  app.get('/health', async () => {
    return { status: 'ok' };
  });

  // Readiness check (tests database connectivity)
  app.get('/health/ready', async (request: FastifyRequest, reply: FastifyReply) => {
    const db = getDb();
    if (!db) {
      return reply.status(503).send({
        status: 'error',
        database: 'disconnected',
        message: 'Database connection string is unconfigured or null',
      });
    }

    try {
      await db.execute(sql`SELECT 1`);
      return reply.status(200).send({
        status: 'ok',
        database: 'connected',
      });
    } catch (err) {
      app.log.error(err);
      return reply.status(503).send({
        status: 'error',
        database: 'disconnected',
        message: 'Database query ping failed',
      });
    }
  });
}
