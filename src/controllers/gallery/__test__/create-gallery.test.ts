import request from "supertest";
import { app } from "../../../app";

it("creates a new gallery", async () => {
  await request(app)
    .post("/api/gallery")
    .set("Cookie", global.signin(true))
    .send({
      title: "Gallery 2022",
      images: ["image1-path.jpg", "image2-path.jpg"],
    })
    .expect(201);
});

it("returns 401 if the user is not an admin", async () => {
  await request(app)
    .post("/api/gallery")
    .set("Cookie", global.signin(false))
    .send({
      title: "Gallery 2022",
      images: ["image1-path.jpg", "image2-path.jpg"],
    })
    .expect(401);
});

it("returns 400 with missing title input", async () => {
  await request(app)
    .post("/api/gallery")
    .set("Cookie", global.signin(true))
    .send({
      images: ["image1-path.jpg", "image2-path.jpg"],
    })
    .expect(400);
});

it("returns 400 when the title is too long (over 150 characters)", async () => {
  await request(app)
    .post("/api/gallery")
    .set("Cookie", global.signin(true))
    .send({
      title:
        "Gallery 2022 is too fucking long. Gallery 2022 is too fucking long. Gallery 2022 is too fucking long. Gallery 2022 is too fucking long. Gallery 2022 is too fucking long. Gallery 2022 is too fucking long. Gallery 2022 is too fucking long. Gallery 2022 is too fucking long.",
      images: ["image1-path.jpg", "image2-path.jpg"],
    })
    .expect(400);
});

it("confirms that the saved gallery contains an valid gallery url attribute", async () => {
  const { body: savedGallery } = await request(app)
    .post("/api/gallery")
    .set("Cookie", global.signin(true))
    .send({
      title: "Gallery 2022",
      images: ["image1-path.jpg", "image2-path.jpg"],
    })
    .expect(201);

  expect(savedGallery.galleryUrl).not.toBeNull();
});

it('returns an error when the gallery title is not unique', async() => {
    await request(app)
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
      title: "Gallery 2022",
      images: ["image1-path.jpg", "image2-path.jpg"],
    })
    .expect(400);
})
