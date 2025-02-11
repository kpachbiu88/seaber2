import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  out: './src/db/migration',
  schema: ['./src/db/schemas/logs.ts'],
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.SERVER_POSTGRES_URL!,
  },
});