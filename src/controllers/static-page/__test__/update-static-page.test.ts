import mongoose from "mongoose";
import request from "supertest";
import { app } from "../../../app";

it("returns 404 if the provided id does not exists", async () => {
  const staticPageId = new mongoose.Types.ObjectId().toHexString();

  await request(app)
    .put(`/api/static-page/${staticPageId}`)
    .set("Cookie", global.signin(true))
    .send({
      title: "This is the static page title",
    })
    .expect(404);
});

it("returns 401 if the user is not an admin", async () => {
  const { body: staticPage } = await request(app)
    .post("/api/static-page")
    .set("Cookie", global.signin(true))
    .send({
      title: "This is the static page title",
      perex: "This is perex",
      text: "This is text",
      assets: ["image1-path", "document1-path"],
    })
    .expect(201);

  await request(app)
    .put(`/api/static-page/${staticPage.id}`)
    .set("Cookie", global.signin(false))
    .send({
      title: "this is new title",
      perex: "this is new perex",
      text: "this is new text",
      assets: ["image1-path", "document1-path"],
    })
    .expect(401);
});

it("returns 400 if the user provide empty title", async () => {
  const { body: staticPage } = await request(app)
    .post("/api/static-page")
    .set("Cookie", global.signin(true))
    .send({
      title: "This is the static page title",
      perex: "This is perex",
      text: "This is text",
      assets: ["image1-path", "document1-path"],
    })
    .expect(201);

  await request(app)
    .put(`/api/static-page/${staticPage.id}`)
    .set("Cookie", global.signin(true))
    .send({
      title: "",
      perex: "this is new perex",
      text: "this is new text",
      assets: ["image1-path", "document1-path"],
    })
    .expect(400);
});

it("returns 400 if the user provides title that already exists in db", async () => {
  const { body: staticPage } = await request(app)
    .post("/api/static-page")
    .set("Cookie", global.signin(true))
    .send({
      title: "This is the static page title",
      perex: "This is perex",
      text: "This is text",
      assets: ["image1-path", "document1-path"],
    })
    .expect(201);

  await request(app)
    .post("/api/static-page")
    .set("Cookie", global.signin(true))
    .send({
      title: "This is another static page title",
      perex: "This is perex",
      text: "This is text",
      assets: ["image1-path", "document1-path"],
    })
    .expect(201);

  await request(app)
    .put(`/api/static-page/${staticPage.id}`)
    .set("Cookie", global.signin(true))
    .send({
      title: "This is another static page title",
      perex: "this is new perex",
      text: "this is new text",
      assets: ["image1-path", "document1-path"],
    })
    .expect(400);
});

it("updates the static page provided valid inputs", async () => {
  const { body: staticPage } = await request(app)
    .post("/api/static-page")
    .set("Cookie", global.signin(true))
    .send({
      title: "This is the static page title",
      perex: "This is perex",
      text: "This is text",
      assets: ["image1-path", "document1-path"],
    })
    .expect(201);

  const { body: updatedPage } = await request(app)
    .put(`/api/static-page/${staticPage.id}`)
    .set("Cookie", global.signin(true))
    .send({
      title: "This is the new title",
      perex: "this is new perex",
      text: "this is new text",
      assets: ["image1-path", "document1-path"],
    })
    .expect(200);
});
