import Fastify from 'fastify';
import cors from '@fastify/cors';
import helmet from '@fastify/helmet';
import rateLimit from '@fastify/rate-limit';
import jwt from '@fastify/jwt';
import { healthRoutes } from './routes/health';
import { contactRoutes } from './routes/contact';
import { auditQuoteRoutes } from './routes/auditQuote';
import { adminRoutes } from './routes/admin';

export async function buildApp() {
  const app = Fastify({
    logger: true,
  });

  // ── JWT Plugin ──────────────────────────────────────────────
  const jwtSecret = process.env.JWT_SECRET || 'super-secret-care2solutions-jwt-key-2026';
  await app.register(jwt, {
    secret: jwtSecret,
  });

  // ── Security Headers (Helmet) ───────────────────────────────
  await app.register(helmet, {
    // Allow inline scripts needed by Cloudflare Turnstile widget on the frontend
    contentSecurityPolicy: false,
    crossOriginEmbedderPolicy: false,
  });

  // ── CORS — environment-driven allowed origins ───────────────
  const rawOrigins = process.env.FRONTEND_URL || 'http://localhost:5173';
  const allowedOrigins = rawOrigins.split(',').map((o) => o.trim());
  await app.register(cors, {
    origin: (origin, cb) => {
      // Allow requests with no origin (e.g. server-to-server, curl, tests)
      if (!origin || allowedOrigins.includes(origin)) {
        cb(null, true);
      } else {
        cb(new Error(`Origin ${origin} not allowed by CORS policy`), false);
      }
    },
    methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
    credentials: true,
  });

  // ── Global Rate Limiting (fallback for unlisted routes) ─────
  await app.register(rateLimit, {
    max: 60,
    timeWindow: '1 minute',
    errorResponseBuilder: (_request, context) => ({
      success: false,
      error: {
        code: 'TOO_MANY_REQUESTS',
        message: `Rate limit exceeded. Maximum ${context.max} requests allowed per ${context.after}. Please try again later.`,
      },
    }),
  });

  // ── Routes ──────────────────────────────────────────────────
  await app.register(healthRoutes, { prefix: '/api' });
  await app.register(contactRoutes, { prefix: '/api' });
  await app.register(auditQuoteRoutes, { prefix: '/api' });
  await app.register(adminRoutes, { prefix: '/api' });

  return app;
}

