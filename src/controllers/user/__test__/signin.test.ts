import request from "supertest";
import { app } from "../../../app";
import { UserAttrs } from "../../../models/user/user";

export const MockUserBody: UserAttrs = {
  email: "test@test.com",
  password: "12345678",
  username: "The coolest guy on Earth",
};

it('fails when email that does not exists is supplied', async() => {

})

it("fails when incorrect password is supplied", async () => {

})

it("responds with cookie when given valid credentials", async () => {
    
})
