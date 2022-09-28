import mongoose from "mongoose";
import request from "supertest";
import { app } from "../../../app";

it("returns 404 if the provided id does not exists", async () => {
  const galleryId = new mongoose.Types.ObjectId().toHexString();

  await request(app)
    .put(`/api/gallery/${galleryId}`)
    .set("Cookie", global.signin(true))
    .send({
      title: "Gallery 2022",
      images: ["image1-path.jpg", "image2-path.jpg"],
    })
    .expect(404);
});

it("return 401 if the user is not an admin", async () => {
  const { body: gallery } = await request(app)
    .post("/api/gallery")
    .set("Cookie", global.signin(true))
    .send({
      title: "Gallery 2022",
      images: ["image1-path.jpg", "image2-path.jpg"],
    })
    .expect(201);

  await request(app)
    .put(`/api/gallery/${gallery.id}`)
    .set("Cookie", global.signin(false))
    .send({
      title: "Gallery 2022",
      images: ["image1-path.jpg", "image2-path.jpg"],
    })
    .expect(401);
});

it("returns 400 if the user provide empty title", async () => {
  const { body: gallery } = await request(app)
    .post("/api/gallery")
    .set("Cookie", global.signin(true))
    .send({
      title: "Gallery 2022",
      images: ["image1-path.jpg", "image2-path.jpg"],
    })
    .expect(201);

  await request(app)
    .put(`/api/gallery/${gallery.id}`)
    .set("Cookie", global.signin(true))
    .send({
      title: "",
      images: ["image1-path.jpg", "image2-path.jpg"],
    })
    .expect(400);
});

it("returns 400 if the user provides title name that already exists in db", async () => {
  const { body: gallery } = await request(app)
    .post("/api/gallery")
    .set("Cookie", global.signin(true))
    .send({
      title: "Gallery 2022",
      images: ["image1-path.jpg", "image2-path.jpg"],
    })
    .expect(201);

  await request(app)
    .post("/api/gallery")
    .set("Cookie", global.signin(true))
    .send({
      title: "Gallery 2021",
      images: ["image3-path.jpg", "image4-path.jpg"],
    })
    .expect(201);

  await request(app)
    .put(`/api/gallery/${gallery.id}`)
    .set("Cookie", global.signin(true))
    .send({
      title: "Gallery 2021",
      images: ["image1-path.jpg", "image2-path.jpg"],
    })
    .expect(400);
});

it("updates the gallery provided valid inputs", async () => {
  const { body: gallery } = await request(app)
    .post("/api/gallery")
    .set("Cookie", global.signin(true))
    .send({
      title: "Gallery 2022",
      images: ["image1-path.jpg", "image2-path.jpg"],
    })
    .expect(201);

  const { body: updatedGallery } = await request(app)
    .put(`/api/gallery/${gallery.id}`)
    .set("Cookie", global.signin(true))
    .send({
      title: "Gallery 2022",
      images: ["new-image1-path.jpg", "new-image2-path.jpg"],
    })
    .expect(200);

    console.log(updatedGallery)
});
