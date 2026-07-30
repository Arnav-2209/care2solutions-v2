import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import {
  listInquiries,
  listAuditQuotes,
  updateInquiryStatus,
  updateAuditQuoteStatus,
  generateCsvExport,
} from '../services/adminService';

const ADMIN_USERNAME = process.env.ADMIN_USERNAME || 'admin';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123';

export async function adminRoutes(app: FastifyInstance) {
  // ── 1. Admin Login ──────────────────────────────────────────
  app.post('/admin/login', async (request: FastifyRequest, reply: FastifyReply) => {
    const body = (request.body || {}) as { username?: string; password?: string };
    const { username, password } = body;

    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      const token = app.jwt.sign({ role: 'admin', username });
      return reply.status(200).send({
        success: true,
        token,
      });
    }

    return reply.status(401).send({
      success: false,
      error: {
        code: 'INVALID_CREDENTIALS',
        message: 'Invalid admin username or password',
      },
    });
  });

  // ── 2. JWT Auth Hook for Protected Admin Endpoints ──────────
  const requireAdminAuth = async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      await request.jwtVerify();
    } catch {
      return reply.status(401).send({
        success: false,
        error: {
          code: 'UNAUTHORIZED',
          message: 'Authentication required. Please provide a valid Authorization bearer token.',
        },
      });
    }
  };

  // ── 3. List Contact Inquiries ──────────────────────────────
  app.get('/admin/inquiries', { preHandler: [requireAdminAuth] }, async (request: FastifyRequest, reply: FastifyReply) => {
    const query = (request.query || {}) as { status?: string; page?: string; limit?: string };
    const status = query.status;
    const page = query.page ? parseInt(query.page, 10) : 1;
    const limit = query.limit ? parseInt(query.limit, 10) : 10;

    const data = await listInquiries({ status, page, limit });
    return reply.status(200).send({ success: true, data });
  });

  // ── 4. List Audit Quote Requests ────────────────────────────
  app.get('/admin/audit-quotes', { preHandler: [requireAdminAuth] }, async (request: FastifyRequest, reply: FastifyReply) => {
    const query = (request.query || {}) as { status?: string; page?: string; limit?: string };
    const status = query.status;
    const page = query.page ? parseInt(query.page, 10) : 1;
    const limit = query.limit ? parseInt(query.limit, 10) : 10;

    const data = await listAuditQuotes({ status, page, limit });
    return reply.status(200).send({ success: true, data });
  });

  // ── 5. Update Contact Inquiry Status ────────────────────────
  app.patch('/admin/inquiries/:id', { preHandler: [requireAdminAuth] }, async (request: FastifyRequest, reply: FastifyReply) => {
    const { id } = request.params as { id: string };
    const body = (request.body || {}) as { status?: string };

    if (!body.status) {
      return reply.status(400).send({
        success: false,
        error: { code: 'VALIDATION_ERROR', message: 'Field "status" is required' },
      });
    }

    try {
      const updated = await updateInquiryStatus(id, body.status);
      if (!updated) {
        return reply.status(404).send({
          success: false,
          error: { code: 'NOT_FOUND', message: `Inquiry with ID ${id} not found` },
        });
      }
      return reply.status(200).send({ success: true, data: updated });
    } catch (err) {
      return reply.status(400).send({
        success: false,
        error: { code: 'VALIDATION_ERROR', message: err instanceof Error ? err.message : 'Invalid request' },
      });
    }
  });

  // ── 6. Update Audit Quote Status ────────────────────────────
  app.patch('/admin/audit-quotes/:id', { preHandler: [requireAdminAuth] }, async (request: FastifyRequest, reply: FastifyReply) => {
    const { id } = request.params as { id: string };
    const body = (request.body || {}) as { status?: string };

    if (!body.status) {
      return reply.status(400).send({
        success: false,
        error: { code: 'VALIDATION_ERROR', message: 'Field "status" is required' },
      });
    }

    try {
      const updated = await updateAuditQuoteStatus(id, body.status);
      if (!updated) {
        return reply.status(404).send({
          success: false,
          error: { code: 'NOT_FOUND', message: `Audit quote request with ID ${id} not found` },
        });
      }
      return reply.status(200).send({ success: true, data: updated });
    } catch (err) {
      return reply.status(400).send({
        success: false,
        error: { code: 'VALIDATION_ERROR', message: err instanceof Error ? err.message : 'Invalid request' },
      });
    }
  });

  // ── 7. Export Leads to CSV ──────────────────────────────────
  app.get('/admin/export', { preHandler: [requireAdminAuth] }, async (request: FastifyRequest, reply: FastifyReply) => {
    const query = (request.query || {}) as { type?: string };
    const exportType = query.type === 'audit-quotes' ? 'audit-quotes' : 'inquiries';

    const csvData = await generateCsvExport(exportType);

    reply
      .header('Content-Type', 'text/csv')
      .header('Content-Disposition', `attachment; filename="care2solutions_${exportType}_export.csv"`)
      .status(200)
      .send(csvData);
  });
}
