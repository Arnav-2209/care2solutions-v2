import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { sendContactFormNotification, sendAuditQuoteNotification } from '../src/services/emailService';

describe('Email Service', () => {
  test('should format and dispatch contact form emails without throwing', async () => {
    await assert.doesNotReject(async () => {
      await sendContactFormNotification({
        name: 'Dr. Test Provider',
        email: 'provider@example.com',
        phone: '+1-555-000-1111',
        practiceName: 'Test Medical Group',
        serviceNeeded: 'medical-billing',
        message: 'Testing email notification service dispatch functionality.',
      });
    });
  });

  test('should format and dispatch audit quote emails without throwing', async () => {
    await assert.doesNotReject(async () => {
      await sendAuditQuoteNotification(
        {
          providerName: 'Dr. Audit Tester',
          email: 'audittester@example.com',
          phone: '+1-555-999-8888',
          specialty: 'Cardiology',
          monthlyBillingVolume: '$100k+',
          notes: 'Testing audit quote notification email dispatch.',
        },
        'aud_test12345',
      );
    });
  });
});
