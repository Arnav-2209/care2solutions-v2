import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import { contactSchema } from '../schemas/contact';
import { processContactInquiry } from '../services/contactService';
import { ZodError } from 'zod';

export async function contactRoutes(app: FastifyInstance) {
  app.post('/contact', async (request: FastifyRequest, reply: FastifyReply) => {
    try {
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
