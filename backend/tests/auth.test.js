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
});