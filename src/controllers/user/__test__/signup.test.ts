import request from "supertest";
import { app } from "../../../app";
import { UserAttrs } from "../../../models/user/user";

const MockUserBody: UserAttrs = {
    email: "test@test.com",
    password: "12345678",
    username: "The coolest guy on Earth",
  };

it("returns 201 on successful login", async () => {
  await request(app).post("/api/users/signup").send(MockUserBody).expect(201);
});

it("returns a 400 with invalid password", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({
      email: "test@test.com",
      username: "My Little Pony",
    })
    .expect(400);
});

it("returns a 400 with invalid username", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({
      email: "test@test.com",
      password: "123456789",
      username: "",
    })
    .expect(400);
});

it("returns a 400 with missing email or password", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({
      password: "123456789",
      username: "My Little Pony",
    })
    .expect(400);
});

it("disallows a duplicate email", async () => {
  await request(app).post("/api/users/signup").send(MockUserBody).expect(201);

  await request(app)
    .post("/api/users/signup")
    .send({
      email: "test@test.com",
      password: "123456789",
      username: "Completely different user",
    })
    .expect(400);
});
