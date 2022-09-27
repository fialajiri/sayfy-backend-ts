import mongoose from "mongoose";
import request from "supertest";
import { app } from "../../../app";

it("returns a 404 if the provided id does not exists", async () => {
  const galleryId = new mongoose.Types.ObjectId().toHexString();
  await request(app)
    .delete(`/api/gallery/${galleryId}`)
    .set("Cookie", global.signin(true))
    .send()
    .expect(404);
});

it("returns 401 if the user is not admin", async () => {
  const { body: createdGallery } = await request(app)
    .post("/api/gallery")
    .set("Cookie", global.signin(true))
    .send({
      title: "Gallery 2022",
      images: ["image1-path.jpg", "image2-path.jpg"],
    })
    .expect(201);

  await request(app)
    .delete(`/api/gallery/${createdGallery.id}`)
    .set("Cookie", global.signin(true))
    .send()
    .expect(200);
});

it("deletes a gallery", async () => {
  const { body: createdGallery } = await request(app)
    .post("/api/gallery")
    .set("Cookie", global.signin(true))
    .send({
      title: "Gallery 2022",
      images: ["image1-path.jpg", "image2-path.jpg"],
    })
    .expect(201);

  await request(app)
    .delete(`/api/gallery/${createdGallery.id}`)
    .set("Cookie", global.signin(true))
    .send()
    .expect(200);
});
