import mongoose from "mongoose";
import request from "supertest";
import { app } from "../../../app";

it("returns a 404 if the provided id does not exists", async () => {
  const aktualitaId = new mongoose.Types.ObjectId().toHexString();

  await request(app)
    .put(`/api/aktualita/${aktualitaId}`)
    .set("Cookie", global.signin(true))
    .send({
      title: "This is an updated title",    
      mainPhoto: "updated-main-photo.jpg",
    })
    .expect(404);
});

it("returns a 401 if the user is not admin", async () => {
  const { body: aktualita } = await request(app)
    .post("/api/aktualita")
    .set("Cookie", global.signin(true))
    .send({
      title: "This is news title",     
      mainPhoto: "main-photo.jpg",
    })
    .expect(201);

  await request(app)
    .put(`/api/aktualita/${aktualita.id}`)
    .set("Cookie", global.signin(false))
    .send({
      title: "This is an updated title",     
      mainPhoto: "updated-main-photo.jpg",
    })
    .expect(401);
});

it("return a 400 if the user provides invalid inputs", async () => {
  const { body: aktualita } = await request(app)
    .post("/api/aktualita")
    .set("Cookie", global.signin(true))
    .send({
      title: "This is news title",     
      mainPhoto: "main-photo.jpg",
    })
    .expect(201);

  await request(app)
    .put(`/api/aktualita/${aktualita.id}`)
    .set("Cookie", global.signin(true))
    .send({
      title: "",     
      mainPhoto: "updated-main-photo.jpg",
    })
    .expect(400);

  

  await request(app)
    .put(`/api/aktualita/${aktualita.id}`)
    .set("Cookie", global.signin(true))
    .send({
      title: "This is an updated title",     
    })
    .expect(400);
});

it("updates the aktualita provided valid inputs", async () => {
  const { body: aktualita } = await request(app)
    .post("/api/aktualita")
    .set("Cookie", global.signin(true))
    .send({
      title: "This is news title",    
      mainPhoto: "main-photo.jpg",
    })
    .expect(201);

  await request(app)
    .put(`/api/aktualita/${aktualita.id}`)
    .set("Cookie", global.signin(true))
    .send({
      title: "This is an updated title",     
      mainPhoto: "updated-main-photo.jpg",
    })
    .expect(200);
});
