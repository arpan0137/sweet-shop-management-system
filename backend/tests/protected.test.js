import jwt from "jsonwebtoken";
import supertest from "supertest";
import app from "../app.js";
import mongoose from "mongoose";
import { env } from "../env.js";

describe("Protected Test", () => {
    it("should deny acces without token", async () => {
        const response = await supertest(app).get("/api/protected-test")
        expect(response.statusCode).toEqual(401)
    })

    it("should grant access with valid token", async () => {
        const token = jwt.sign({ userId: new mongoose.Types.ObjectId(), role: "user" }, env.jwtSecret)

        const response = await supertest(app)
            .get("/api/protected-test")
            .set('Authorization', `Bearer ${token}`)

        expect(response.statusCode).toBe(200)
        expect(response.body).toHaveProperty('message', "You have access")
    })
})