import express, { Request, Response } from 'express';
import db from './db/connection'
import { logsTable } from './db/schemas/logs';

export const app = express();
const port = process.env.SERVER_PORT || 8000;

app.use(express.json());

app.get('/logs', async (req: Request, res: Response) => {
  try {
    const logs = await db.select().from(logsTable);
    console.log('Logs list:', logs);

    res.json(logs);
  } catch (err) {
    console.log(err)
    res.status(500).json({ error: 'Database query failed' });
  }
});

app.post('/logs', async (req: Request, res: Response) => {
  try {
    const newLog = await db.insert(logsTable).values({ json: req.body }).returning();
    console.log('New log added:', newLog);

    res.status(201).json(newLog);
  } catch (err) {
    console.log(err)
    res.status(500).json({ error: 'Database query failed' });
  }
});

export const server = app.listen(port, () => {
  console.log(`Server is running on port ${port} 🚀`);
});