import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';

const connectionString = process.env.DATABASE_URL;

// Lazy/Conditional initialization to support running without live DB connection in development/testing
let dbClient: ReturnType<typeof drizzle<typeof schema>> | null = null;

export function getDb() {
  if (!dbClient) {
    if (!connectionString) {
      return null;
    }
    try {
      const client = postgres(connectionString, { max: 10 });
      dbClient = drizzle(client, { schema });
    } catch {
      return null;
    }
  }
  return dbClient;
}

export { schema };
