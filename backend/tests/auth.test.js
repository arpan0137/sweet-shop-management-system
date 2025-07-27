import supertest from "supertest";
import app from "../app";
import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import { User } from "../src/models/user.model";
import bcryptjs from "bcryptjs";

let mongoServer;

//before all tests, create an in-memory MongoDB server and connect mongoose
beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const MongoUri = mongoServer.getUri();
    await mongoose.connect(MongoUri);
})

//after each test clear all data from the database
afterEach(async () => {
    await mongoose.connection.db.dropDatabase();
})

//after all tests, close the in-memory MongoDB server
afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
})

describe("POST /api/auth/register", () => {
    it("it should register a new user", async () => {
        // Should register a new user with valid data
        const response = await supertest(app)
        .post("/api/auth/register")
        .send({
            username: "testuser",
            password: "test123",
        });
        expect(response.statusCode).toEqual(201);
    });

    it('should save the user to the database',async () => {
        const userData = {
            username: "testuser2",
            password: "test1234"
        }

        await supertest(app)
        .post('/api/auth/register')
        .send(userData)

        const savedUser = await User.findOne({username: "testuser2"});
        expect(savedUser).not.toBeNull();
        expect(savedUser.username).toBe("testuser2");
    })
});

describe("POST /api/auth/login",() => {
    it("should login a valid user and return JWT token", async () => {
        // create a user and save to the database
        const password = 'password123';
        const hashedPassword = await bcryptjs.hash(password, 10);
        await new User({username: 'loginuser', password: 'hashedPassword'}).save();

        // Attempt to login with correct credentials
        const response = await supertest(app)
        .post('/api/auth/login')
        .send({
            username: 'loginuser',
            password: password
        });

        // Assert the response
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('token');
    });
})