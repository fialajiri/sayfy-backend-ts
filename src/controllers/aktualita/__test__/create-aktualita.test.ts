import request from "supertest";
import { app } from "../../../app";

it("creates a new aktualita", async () => {
  await request(app)
    .post("/api/aktualita")
    .set("Cookie", global.signin(true))
    .send({
      title: "This is news title",     
      mainPhoto: "main-photo.jpg",
    })
    .expect(201);
});

it("return 401 if the user is not an admin", async () => {
  await request(app)
    .post("/api/aktualita")
    .set("Cookie", global.signin(false))
    .send({
      title: "This is news title",     
      mainPhoto: "main-photo.jpg",
    })
    .expect(401);
});

it("return 400 with missing title input", async () => {
  await request(app)
    .post("/api/aktualita")
    .set("Cookie", global.signin(true))
    .send({
     
      mainPhoto: "main-photo.jpg",
    })
    .expect(400);
});



it("returns 400 with missing main photo input", async () => {
  await request(app)
    .post("/api/aktualita")
    .set("Cookie", global.signin(true))
    .send({
      title: "This is news title",
      perex: "This is news perex.",
    })
    .expect(400);
});

it("returns an error when the aktualita title is not unique", async () => {
  await request(app)
    .post("/api/aktualita")
    .set("Cookie", global.signin(true))
    .send({
      title: "This is news title",    
      mainPhoto: "main-photo.jpg",
    })
    .expect(201);

  await request(app)
    .post("/api/aktualita")
    .set("Cookie", global.signin(true))
    .send({
      title: "This is news title",     
      mainPhoto: "main-photo.jpg",
    })
    .expect(400);
});
