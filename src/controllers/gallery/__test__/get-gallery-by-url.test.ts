import request from "supertest";
import { app } from "../../../app";

it("returns 404 if the provided gallery url does not exists", async () => {
  const galleryUrl = "this-shloud-not-exits";

  await request(app).get(`/api/gallery/${galleryUrl}`).send().expect(404);
});

it("returns 200 and fetches a gallery given the valid gallery url", async () => {
  const { body: createdGallery } = await request(app)
    .post("/api/gallery")
    .set("Cookie", global.signin(true))
    .send({
      title: "Gallery 2022",
      images: ["image1-path.jpg", "image2-path.jpg"],
    })
    .expect(201);

  const { body: requestedGallery } = await request(app)
    .get(`/api/gallery/${createdGallery.galleryUrl}`)
    .send()
    .expect(200);

  expect(requestedGallery).not.toBeNull();
});
