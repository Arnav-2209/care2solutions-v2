import sanitizeHtml from 'sanitize-html';

/**
 * Strips all HTML tags and dangerous content from a string.
 * Used to sanitize freeform text input (names, messages, notes)
 * before persisting to the database, preventing stored XSS.
 */
export function sanitizeText(value: string): string {
  return sanitizeHtml(value, {
    allowedTags: [],
    allowedAttributes: {},
  }).trim();
}

/**
 * Sanitizes an optional string field.
 * Returns undefined if the input is undefined or becomes empty after sanitization.
 */
export function sanitizeOptional(value: string | undefined): string | undefined {
  if (value === undefined) return undefined;
  const cleaned = sanitizeText(value);
  return cleaned.length > 0 ? cleaned : undefined;
}
