import { drizzle } from 'drizzle-orm/node-postgres';

const db = drizzle(process.env.SERVER_POSTGRES_URL!);

export default db;