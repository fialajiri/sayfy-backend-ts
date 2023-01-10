import request from "supertest";
import { app } from "../../../app";

it("creates a new static page", async () => {
  await request(app)
    .post("/api/static-page")
    .set("Cookie", global.signin(true))
    .send({
      title: "This is the static page title",     
      text: "This is text",
      assets: ["image1-path", "document1-path"],
    })
    .expect(201);
});

it("returns 401 if the user is not an admin", async () => {
  await request(app)
    .post("/api/static-page")
    .set("Cookie", global.signin(false))
    .send({
      title: "This is the static page title",
      text: "This is text",
      assets: ["image1-path", "document1-path"],
    })
    .expect(401);
});

it("returns 400 with missing title input", async () => {
  await request(app)
    .post("/api/static-page")
    .set("Cookie", global.signin(true))
    .send({
      text: "This is text",
      assets: ["image1-path", "document1-path"],
    })
    .expect(400);
});

it("returns 400 when the title is loo long (over 150 characters)", async () => {
  await request(app)
    .post("/api/static-page")
    .set("Cookie", global.signin(true))
    .send({
      title:
        "This title is way too long. This title is way too long. This title is way too long. This title is way too long. This title is way too long. This title is way too long. This title is way too long. This title is way too long. This title is way too long. This title is way too long. This title is way too long. This title is way too long. This title is way too long. This title is way too long. This title is way too long. This title is way too long. This title is way too long.",

      text: "This is text",
      assets: ["image1-path", "document1-path"],
    })
    .expect(400);
});


