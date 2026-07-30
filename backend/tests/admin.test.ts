import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { buildApp } from '../src/app';

describe('Admin Lead Management Portal APIs', () => {
  test('should return 401 Unauthorized for invalid admin login credentials', async () => {
    const app = await buildApp();

    const response = await app.inject({
      method: 'POST',
      url: '/api/admin/login',
      payload: {
        username: 'wrongadmin',
        password: 'wrongpassword',
      },
    });

    assert.equal(response.statusCode, 401);
    const body = response.json();
    assert.equal(body.success, false);
    assert.equal(body.error.code, 'INVALID_CREDENTIALS');

    await app.close();
  });

  test('should return 200 OK with JWT token for valid admin login', async () => {
    const app = await buildApp();

    const response = await app.inject({
      method: 'POST',
      url: '/api/admin/login',
      payload: {
        username: 'admin',
        password: 'admin123',
      },
    });

    assert.equal(response.statusCode, 200);
    const body = response.json();
    assert.equal(body.success, true);
    assert.ok(typeof body.token === 'string');

    await app.close();
  });

  test('should return 401 Unauthorized for protected endpoint without JWT token', async () => {
    const app = await buildApp();

    const response = await app.inject({
      method: 'GET',
      url: '/api/admin/inquiries',
    });

    assert.equal(response.statusCode, 401);

    await app.close();
  });

  test('should return 200 OK for GET /api/admin/inquiries with valid JWT token', async () => {
    const app = await buildApp();

    // Login first
    const loginRes = await app.inject({
      method: 'POST',
      url: '/api/admin/login',
      payload: { username: 'admin', password: 'admin123' },
    });
    const { token } = loginRes.json();

    const response = await app.inject({
      method: 'GET',
      url: '/api/admin/inquiries?page=1&limit=10',
      headers: {
        authorization: `Bearer ${token}`,
      },
    });

    assert.equal(response.statusCode, 200);
    const body = response.json();
    assert.equal(body.success, true);
    assert.ok(Array.isArray(body.data.items));

    await app.close();
  });

  test('should return 200 OK for GET /api/admin/audit-quotes with valid JWT token', async () => {
    const app = await buildApp();

    const loginRes = await app.inject({
      method: 'POST',
      url: '/api/admin/login',
      payload: { username: 'admin', password: 'admin123' },
    });
    const { token } = loginRes.json();

    const response = await app.inject({
      method: 'GET',
      url: '/api/admin/audit-quotes?page=1&limit=10',
      headers: {
        authorization: `Bearer ${token}`,
      },
    });

    assert.equal(response.statusCode, 200);
    const body = response.json();
    assert.equal(body.success, true);
    assert.ok(Array.isArray(body.data.items));

    await app.close();
  });

  test('should return CSV export for GET /api/admin/export with valid JWT token', async () => {
    const app = await buildApp();

    const loginRes = await app.inject({
      method: 'POST',
      url: '/api/admin/login',
      payload: { username: 'admin', password: 'admin123' },
    });
    const { token } = loginRes.json();

    const response = await app.inject({
      method: 'GET',
      url: '/api/admin/export?type=inquiries',
      headers: {
        authorization: `Bearer ${token}`,
      },
    });

    assert.equal(response.statusCode, 200);
    assert.equal(response.headers['content-type'], 'text/csv');
    assert.ok(response.payload.includes('"ID","Name","Email"'));

    await app.close();
  });
});
