// In backend/tests/sweets.test.js
import request from 'supertest';
import app from '../app.js';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import { env } from '../env.js';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { Sweet } from '../src/models/sweet.model.js';
import supertest from 'supertest';

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
    it('should allow an admin to add a new sweet and return 201', async () => {
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

describe('GET /api/sweets', () => {
    it('should return a list of all sweets for an authenticated user', async () => {
        const token = jwt.sign({ userId: new mongoose.Types.ObjectId(), role: 'user' }, env.jwtSecret);
        await Sweet.create([
            { name: 'Gulab Jamun', category: 'Classic', price: 150, quantityinstock: 50 },
            { name: 'Rasgulla', category: 'Classic', price: 150, quantityinstock: 50 },
            { name: 'Kheer', category: 'Classic', price: 150, quantityinstock: 50 },
        ])

        const res = await supertest(app)
            .get('/api/sweets')
            .set('Authorization', `Bearer ${token}`)

        expect(res.statusCode).toEqual(200);
        expect(res.body.data).toBeInstanceOf(Array);
        expect(res.body.data.length).toBe(3);
    })
})

describe('GET /api/sweets/search', () => {
    let token;

    // Before each test in this block, create a token and some sample sweets
    beforeEach(async () => {
        token = jwt.sign({ userId: new mongoose.Types.ObjectId(), role: 'user' }, env.jwtSecret);
        await Sweet.create([
            { name: 'Kaju Katli', category: 'Barfi', price: 500, quantityinstock: 30 },
            { name: 'Gulab Jamun', category: 'Syrupy', price: 150, quantityinstock: 50 },
            { name: 'Jalebi', category: 'Syrupy', price: 120, quantityinstock: 80 }
        ]);
    });

    it('should find sweets by name', async () => {
        const res = await request(app)
            .get('/api/sweets/search?name=Kaju+Katli')
            .set('Authorization', `Bearer ${token}`);

        expect(res.statusCode).toEqual(200);
        expect(res.body.data.length).toBe(1);
        expect(res.body.data[0].name).toBe('Kaju Katli');
    });

    it('should find sweets by category', async () => {
        const res = await request(app)
            .get('/api/sweets/search?category=Syrupy')
            .set('Authorization', `Bearer ${token}`);

        expect(res.statusCode).toEqual(200);
        expect(res.body.data.length).toBe(2);
    });

    it('should find sweets by price range', async () => {
        const res = await request(app)
            .get('/api/sweets/search?minPrice=100&maxPrice=200')
            .set('Authorization', `Bearer ${token}`);

        expect(res.statusCode).toEqual(200);
        expect(res.body.data.length).toBe(2);
    });
});