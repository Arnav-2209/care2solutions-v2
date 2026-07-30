/**
 * Cloudflare Turnstile CAPTCHA verification.
 *
 * Validates a client-side Turnstile token against Cloudflare's siteverify API.
 * In development (NODE_ENV !== 'production') with no secret key configured,
 * verification is bypassed so local dev and tests continue to work.
 */

const TURNSTILE_VERIFY_URL = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';

interface TurnstileResponse {
  success: boolean;
  'error-codes'?: string[];
}

/**
 * Returns true if the CAPTCHA token is valid, false otherwise.
 * Bypasses verification when TURNSTILE_SECRET_KEY is not set and NODE_ENV is not production.
 */
export async function verifyCaptcha(token: string | undefined): Promise<boolean> {
  const secretKey = process.env.TURNSTILE_SECRET_KEY;
  const isProduction = process.env.NODE_ENV === 'production';

  // Dev bypass: skip verification when no secret key is configured in non-production
  if (!secretKey) {
    if (isProduction) {
      console.error('[CAPTCHA] TURNSTILE_SECRET_KEY is not set in production! Blocking request.');
      return false;
    }
    console.warn('[CAPTCHA] DEV BYPASS: Skipping Turnstile verification (TURNSTILE_SECRET_KEY not set).');
    return true;
  }

  if (!token) {
    return false;
  }

  try {
    const body = new URLSearchParams({
      secret: secretKey,
      response: token,
    });

    const res = await fetch(TURNSTILE_VERIFY_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: body.toString(),
    });

    const data = (await res.json()) as TurnstileResponse;
    return data.success === true;
  } catch (err) {
    console.error('[CAPTCHA] Turnstile verification request failed:', err);
    return false;
  }
}
