import request from 'supertest'
import { app, server } from '../src/index';
import db from '../src/db/connection';
import { logsTable } from '../src/db/schemas/logs';

jest.mock('../src/db/connection', () => ({
	select: jest.fn().mockReturnThis(),
	from: jest.fn().mockReturnThis(),
	insert: jest.fn().mockReturnThis(),
	values: jest.fn().mockReturnThis(),
	returning: jest.fn().mockReturnThis(),
}));

describe('API tests', () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	afterAll(() => {
		server.close()
	});

	it('should return logs list', async () => {
		const mockLogs = [{ id: 1, json: { message: 'test log' } }];

		(db.select().from as jest.Mock).mockResolvedValue(mockLogs);

		const response = await request(app).get('/logs');

		expect(response.status).toBe(200);
		expect(response.body).toEqual(mockLogs);
	});

	it('should add a new log', async () => {
		const newLog = { id: 2, json: { message: 'new log' } };

		(db.insert(logsTable).values as jest.Mock).mockReturnValue({
			returning: jest.fn().mockResolvedValue([newLog])
		});

		const response = await request(app).post('/logs').send({ message: 'new log' });

		expect(response.status).toBe(201);
		expect(response.body).toEqual([newLog]);
		expect(db.insert(logsTable).values).toHaveBeenCalledWith({ json: { message: 'new log' } });
	});

	it('should handle database errors when fetching logs', async () => {
		(db.select().from as jest.Mock).mockRejectedValue(new Error('Database query failed'));

		const response = await request(app).get('/logs');

		expect(response.status).toBe(500);
		expect(response.body).toEqual({ error: 'Database query failed' });
	});

	it('should handle database errors when adding a new log', async () => {
		(db.insert(logsTable).values as jest.Mock).mockReturnValue({
			returning: jest.fn().mockRejectedValue(new Error('Database query failed')),
		});

		const response = await request(app).post('/logs').send({ message: 'new log' });

		expect(response.status).toBe(500);
		expect(response.body).toEqual({ error: 'Database query failed' });
	});
});