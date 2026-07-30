import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { buildApp } from '../src/app';

describe('Lead Metadata & UTM Extraction', () => {
  test('should accept contact payload with UTM parameters and custom headers', async () => {
    const app = await buildApp();

    const payloadWithUtm = {
      name: 'Dr. Attribution Test',
      email: 'attribution@example.com',
      phone: '+1-555-888-7777',
      practiceName: 'Analytics Clinic',
      serviceNeeded: 'medical-billing',
      message: 'Testing UTM lead metadata extraction and persistence.',
      utm_source: 'google',
      utm_medium: 'cpc',
      utm_campaign: 'rcm_promo_2026',
      referrer_url: 'https://google.com/search?q=medical+billing',
      landing_page: 'https://care2solution.com/',
    };

    const response = await app.inject({
      method: 'POST',
      url: '/api/contact',
      headers: {
        'user-agent': 'Mozilla/5.0 TestBrowser/1.0',
        'x-forwarded-for': '198.51.100.42',
      },
      payload: payloadWithUtm,
    });

    assert.equal(response.statusCode, 200);
    const body = response.json();
    assert.equal(body.success, true);

    await app.close();
  });

  test('should accept audit quote payload with UTM parameters and custom headers', async () => {
    const app = await buildApp();

    const payloadWithUtm = {
      providerName: 'Dr. Audit Analytics',
      email: 'auditanalytics@example.com',
      phone: '+1-555-444-3333',
      specialty: 'Neurology',
      monthlyBillingVolume: '$50k-$100k',
      notes: 'Testing UTM analytics metadata extraction on audit route.',
      utm_source: 'linkedin',
      utm_medium: 'social',
      utm_campaign: 'rcm_audit_campaign',
    };

    const response = await app.inject({
      method: 'POST',
      url: '/api/audit-quote',
      headers: {
        'user-agent': 'Mozilla/5.0 TestBrowser/1.0',
        'x-forwarded-for': '203.0.113.195',
      },
      payload: payloadWithUtm,
    });

    assert.equal(response.statusCode, 200);
    const body = response.json();
    assert.equal(body.success, true);
    assert.ok(typeof body.requestId === 'string');

    await app.close();
  });
});
