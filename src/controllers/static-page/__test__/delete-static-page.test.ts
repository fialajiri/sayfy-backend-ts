import mongoose from "mongoose";
import request from "supertest";
import { app } from "../../../app";

it("returns a 404 error if the provided id does not exists", async () => {
  const staticPageId = new mongoose.Types.ObjectId().toHexString();

  await request(app)
    .delete(`/api/static-page/${staticPageId}`)
    .set("Cookie", global.signin(true))
    .send()
    .expect(404);
});

it("returns a 401 if the user is not an admin", async () => {
  const { body: staticPage } = await request(app)
    .post("/api/static-page")
    .set("Cookie", global.signin(true))
    .send({
      title: "This is the static page title",     
      text: "This is text",
      assets: ["image1-path", "document1-path"],
    })
    .expect(201);

    await request(app)
    .delete(`/api/static-page/${staticPage.id}`)
    .set("Cookie", global.signin(false))
    .send()
    .expect(401);
});

it("deletes a static page", async () => {
    const { body: staticPage } = await request(app)
    .post("/api/static-page")
    .set("Cookie", global.signin(true))
    .send({
      title: "This is the static page title",     
      text: "This is text",
      assets: ["image1-path", "document1-path"],
    })
    .expect(201);

    await request(app)
    .delete(`/api/static-page/${staticPage.id}`)
    .set("Cookie", global.signin(true))
    .send()
    .expect(200);
});
