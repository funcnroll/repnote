/**
 * Generates a unique 8-character identifier using the browser's crypto API
 * Used for creating unique IDs for templates and exercises
 * @returns A random 8-character string
 */
export function generateId(): string {
  return crypto.randomUUID().slice(0, 8);
}
