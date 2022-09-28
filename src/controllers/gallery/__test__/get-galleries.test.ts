import request from "supertest";
import { app } from "../../../app";

it("fetches a list of galleries", async () => {
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
      title: "Gallery 2021",
      images: ["image3-path.jpg", "image4-path.jpg"],
    })
    .expect(201);

  const { body: galleries } = await request(app).get("/api/gallery").send().expect(200);

  expect(galleries.length).toEqual(2);
});
