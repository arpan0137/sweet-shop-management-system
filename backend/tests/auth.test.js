import supertest from "supertest";
import app from "../app";

describe("POST /api/auth/register", () => {
    it("it should register a new user", async () => {
        // Should register a new user with valid data
        const response = await supertest(app)
        .post("/api/auth/register")
        .send({
            email: "testuser",
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
    })
});