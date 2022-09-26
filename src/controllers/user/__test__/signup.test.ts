import request from "supertest";
import { app } from "../../../app";
import { UserAttrs } from "../../../models/user/user";

export const MockUserBody: UserAttrs = {
  email: "test@test.com",
  password: "12345678",
  username: "The coolest guy on Earth",
};

it("returns 201 on successful login", async () => {
    await request(app)
        .post("")
});

it("returns a 400 with invalid password", async () => {});

it("returns a 400 with invalid username", async () => {});

it("returns a 400 with missing email or password", async () => {});

it("disallows a duplicate email", async () => {});
