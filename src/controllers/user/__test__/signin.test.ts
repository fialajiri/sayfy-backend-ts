import request from "supertest";
import { app } from "../../../app";
import { UserAttrs } from "../../../models/user/user";

const MockUserBody: UserAttrs = {
  email: "test@test.com",
  password: "12345678",
  username: "The coolest guy on Earth",
};

it("fails when email that does not exists is supplied", async () => {
  await request(app)
    .post("/api/users/signin")
    .send({ email: "thisemaildoesnotexist@nope.com", password: "123456789" })
    .expect(400);
});

it("fails when incorrect password is supplied", async () => {
  await request(app).post("/api/users/signup").send(MockUserBody).expect(201);

  await request(app)
    .post("/api/users/signin")
    .send({ email: "test@test.com", password: "123" })
    .expect(400);
});

it("responds with cookie when given valid credentials", async () => {
  await request(app).post("/api/users/signup").send(MockUserBody).expect(201);

  const response = await request(app)
    .post("/api/users/signin")
    .send({ email: "test@test.com", password: "12345678" })
    .expect(200);

  expect(response.get("Set-Cookie")).toBeDefined();
});
