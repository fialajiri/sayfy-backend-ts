import mongoose from "mongoose";
import request from "supertest";
import { app } from "../../../app";

it("returns a 404 if the provided id does not exists", async () => {
  const aktualitaId = new mongoose.Types.ObjectId().toHexString();
  await request(app)
    .delete(`/api/aktualita/${aktualitaId}`)
    .set("Cookie", global.signin(true))
    .send()
    .expect(404);
});

it("deletes an aktualita", async () => {
  const { body: aktualita } = await request(app)
    .post("/api/aktualita")
    .set("Cookie", global.signin(true))
    .send({
      title: "This is news title",
      perex: "This is news perex.",
      mainPhoto: "main-photo.jpg",
    })
    .expect(201);

  await request(app)
    .delete(`/api/aktualita/${aktualita.id}`)
    .set("Cookie", global.signin(true))
    .send()
    .expect(200);
});
