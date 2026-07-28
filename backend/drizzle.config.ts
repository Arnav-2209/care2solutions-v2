import { defineConfig } from 'drizzle-kit';

const dbUrl = process.env.DATABASE_URL || 'postgresql://user:password@localhost:5432/care2solutions';

export default defineConfig({
  schema: './src/db/schema.ts',
  out: './drizzle',
  dialect: 'postgresql',
  dbCredentials: {
    url: dbUrl,
  },
});
