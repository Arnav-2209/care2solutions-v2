import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { buildApp } from '../src/app';

describe('GET /api/health', () => {
  test('should return 200 OK with status ok for liveness check', async () => {
    const app = await buildApp();

    const response = await app.inject({
      method: 'GET',
      url: '/api/health',
    });

    assert.equal(response.statusCode, 200);
    assert.deepEqual(response.json(), { status: 'ok' });

    await app.close();
  });
});

describe('GET /api/health/ready', () => {
  test('should return status response for readiness check', async () => {
    const app = await buildApp();

    const response = await app.inject({
      method: 'GET',
      url: '/api/health/ready',
    });

    // In unit test environment without live PostgreSQL DATABASE_URL, expects 503 Service Unavailable or 200 OK
    assert.ok(response.statusCode === 200 || response.statusCode === 503);
    const body = response.json();
    assert.ok('status' in body);
    assert.ok('database' in body);

    await app.close();
  });
});
