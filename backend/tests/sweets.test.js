// In backend/tests/sweets.test.js
import request from 'supertest';
import app from '../app.js';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import { env } from '../env.js';
import { MongoMemoryServer } from 'mongodb-memory-server';

let mongoServer;

// Set up the in-memory database before all tests
beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const mongoUri = mongoServer.getUri();
    await mongoose.connect(mongoUri);
});

// Clean up the database after each test
afterEach(async () => {
    await mongoose.connection.db.dropDatabase();
});

// Disconnect and stop the server after all tests
afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
});

describe('POST /api/sweets', () => {
    it('should add a new sweet and return 201', async () => {
        const token = jwt.sign({ userId: new mongoose.Types.ObjectId(), role: 'admin' }, env.jwtSecret);
        const res = await request(app)
            .post('/api/sweets')
            .set('Authorization', `Bearer ${token}`)
            .send({
                name: 'Gulab Jamun',
                category: 'Classic',
                price: 150,
                quantityinstock: 50
            });
        expect(res.statusCode).toEqual(201);
        expect(res.body.data).toHaveProperty('name', 'Gulab Jamun');
    });
});