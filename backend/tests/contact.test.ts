import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { buildApp } from '../src/app';

describe('POST /api/contact', () => {
  test('should return 200 OK for valid contact inquiry payload', async () => {
    const app = await buildApp();

    const validPayload = {
      name: 'Dr. Sarah Jenkins',
      email: 'sarah.jenkins@exampleclinic.com',
      phone: '+1-555-234-5678',
      practiceName: 'Jenkins Internal Medicine',
      serviceNeeded: 'medical-billing',
      message: 'We are looking to outsource our billing and RCM for a 4-provider practice.',
    };

    const response = await app.inject({
      method: 'POST',
      url: '/api/contact',
      payload: validPayload,
    });

    assert.equal(response.statusCode, 200);
    const body = response.json();
    assert.equal(body.success, true);
    assert.ok(typeof body.message === 'string');

    await app.close();
  });

  test('should return 400 Bad Request for invalid email format', async () => {
    const app = await buildApp();

    const invalidPayload = {
      name: 'Dr. Sarah Jenkins',
      email: 'invalid-email-address',
      phone: '+1-555-234-5678',
      serviceNeeded: 'medical-billing',
      message: 'Looking for medical billing services.',
    };

    const response = await app.inject({
      method: 'POST',
      url: '/api/contact',
      payload: invalidPayload,
    });

    assert.equal(response.statusCode, 400);
    const body = response.json();
    assert.equal(body.success, false);
    assert.equal(body.error.code, 'VALIDATION_ERROR');
    assert.ok(body.error.fields.email);

    await app.close();
  });

  test('should return 400 Bad Request for invalid serviceNeeded enum value', async () => {
    const app = await buildApp();

    const invalidPayload = {
      name: 'Dr. Sarah Jenkins',
      email: 'sarah@example.com',
      phone: '+1-555-234-5678',
      serviceNeeded: 'unsupported-service',
      message: 'Looking for medical billing services.',
    };

    const response = await app.inject({
      method: 'POST',
      url: '/api/contact',
      payload: invalidPayload,
    });

    assert.equal(response.statusCode, 400);
    const body = response.json();
    assert.equal(body.success, false);
    assert.equal(body.error.code, 'VALIDATION_ERROR');

    await app.close();
  });
});
