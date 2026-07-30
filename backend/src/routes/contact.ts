import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import { contactSchema } from '../schemas/contact';
import { processContactInquiry } from '../services/contactService';
import { verifyCaptcha } from '../utils/captcha';
import { ZodError } from 'zod';

export async function contactRoutes(app: FastifyInstance) {
  app.post('/contact', {
    config: { rateLimit: { max: 5, timeWindow: '15 minutes' } },
  }, async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      // 1. Verify CAPTCHA token before any processing
      const body = request.body as Record<string, unknown>;
      const captchaToken = typeof body?.captchaToken === 'string' ? body.captchaToken : undefined;
      const captchaValid = await verifyCaptcha(captchaToken);
      if (!captchaValid) {
        return reply.status(400).send({
          success: false,
          error: {
            code: 'CAPTCHA_FAILED',
            message: 'CAPTCHA verification failed. Please complete the security check and try again.',
          },
        });
      }

      // 2. Validate payload with Zod
      const validatedInput = contactSchema.parse(request.body);
      const result = await processContactInquiry(validatedInput);
      return reply.status(200).send(result);
    } catch (err) {
      if (err instanceof ZodError) {
        const fields: Record<string, string> = {};
        for (const issue of err.issues) {
          const pathKey = issue.path.join('.') || 'body';
          fields[pathKey] = issue.message;
        }

        return reply.status(400).send({
          success: false,
          error: {
            code: 'VALIDATION_ERROR',
            message: 'Invalid request payload',
            fields,
          },
        });
      }

      app.log.error(err);
      return reply.status(500).send({
        success: false,
        error: {
          code: 'INTERNAL_SERVER_ERROR',
          message: 'An unexpected error occurred. Please try again later.',
        },
      });
    }
  });
}

