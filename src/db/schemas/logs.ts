import { pgTable, integer, timestamp, json } from 'drizzle-orm/pg-core';

export const logsTable = pgTable('logs', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  inserted_at: timestamp({ withTimezone: true }).defaultNow().notNull(),
  json: json().notNull(),
});