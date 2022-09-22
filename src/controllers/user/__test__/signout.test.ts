import request from "supertest";
import { app } from "../../../app";
import { UserAttrs } from "../../../models/user/user";

const MockUserBody: UserAttrs = {
  email: "test@test.com",
  password: "12345678",
  username: "The coolest guy on Earth",
};

it("successfuly logs out an user", async () => {
  await request(app).post("/api/users/signup").send(MockUserBody).expect(201);

  const response = await request(app)
    .post("/api/users/signout")
    .send()
    .expect(200);

  expect(response.get("Set-Cookie")[0]).toEqual(
    "jwt=; Path=/; HttpOnly; Secure; SameSite=None"
  );
});
