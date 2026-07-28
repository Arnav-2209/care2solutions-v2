import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { buildApp } from '../src/app';

describe('POST /api/audit-quote', () => {
  test('should return 200 OK for valid audit quote request', async () => {
    const app = await buildApp();

    const validPayload = {
      providerName: 'Dr. Robert Chen',
      email: 'rchen@cardiologygroup.com',
      phone: '+1-555-987-6543',
      specialty: 'Cardiology',
      monthlyBillingVolume: '$100k+',
      notes: 'Interested in reducing our current 12% denial rate.',
    };

    const response = await app.inject({
      method: 'POST',
      url: '/api/audit-quote',
      payload: validPayload,
    });

    assert.equal(response.statusCode, 200);
    const body = response.json();
    assert.equal(body.success, true);
    assert.ok(typeof body.message === 'string');
    assert.ok(typeof body.requestId === 'string');

    await app.close();
  });

  test('should return 400 Bad Request when specialty is missing', async () => {
    const app = await buildApp();

    const invalidPayload = {
      providerName: 'Dr. Robert Chen',
      email: 'rchen@cardiologygroup.com',
      phone: '+1-555-987-6543',
    };

    const response = await app.inject({
      method: 'POST',
      url: '/api/audit-quote',
      payload: invalidPayload,
    });

    assert.equal(response.statusCode, 400);
    const body = response.json();
    assert.equal(body.success, false);
    assert.equal(body.error.code, 'VALIDATION_ERROR');
    assert.ok(body.error.fields.specialty);

    await app.close();
  });
});
