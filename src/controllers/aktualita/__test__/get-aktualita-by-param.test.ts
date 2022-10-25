import request from "supertest";
import mongoose from "mongoose";
import { app } from "../../../app";
import { AktualitaDoc } from "../../../models/aktualita/aktualita";

it("returns 404 if the provided id does not exists", async () => {
  const aktualitaId = new mongoose.Types.ObjectId().toHexString();

  await request(app).get(`/api/aktualita/${aktualitaId}`).send().expect(404);
});

it("returns 200 and fetches an aktualita given the valid id", async () => {
  const { body: aktualita } = await request(app)
    .post("/api/aktualita")
    .set("Cookie", global.signin(true))
    .send({
      title: "This is news title",
      perex: "This is news perex.",
      mainPhoto: "main-photo.jpg",
    })
    .expect(201);

  const { body: requestedAktualita } = await request(app)
    .get(`/api/aktualita/${aktualita.id}`)
    .send()
    .expect(200);

  expect(requestedAktualita).not.toBeNull();
});

it("returns 200 and fetches aktualita provided a valid aktualita url", async () => {
  const { body: aktualita }: { body: AktualitaDoc } = await request(app)
    .post("/api/aktualita")
    .set("Cookie", global.signin(true))
    .send({
      title: "This is news title",
      perex: "This is news perex.",
      mainPhoto: "main-photo.jpg",
    })
    .expect(201);

  

  const { body: requestedAktualita }: { body: AktualitaDoc } = await request(app)
    .get(`/api/aktualita/${aktualita.aktualitaUrl}`)
    .send()
    .expect(200);

  expect(requestedAktualita).not.toBeNull();
});
