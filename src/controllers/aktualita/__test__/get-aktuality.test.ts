import request from "supertest";
import { app } from "../../../app";

it("can fetch a list of aktuality", async () => {
  await request(app)
    .post("/api/aktualita")
    .set("Cookie", global.signin(true))
    .send({
      title: "This is news title",
      perex: "This is news perex.",
      mainPhoto: "main-photo.jpg",
    })
    .expect(201);

  await request(app)
    .post("/api/aktualita")
    .set("Cookie", global.signin(true))
    .send({
      title: "This another title",
      perex: "This another perex.",
      mainPhoto: "another-main-photo.jpg",
    })
    .expect(201);

  const { body: aktuality } = await request(app).get("/api/aktualita").send().expect(200);

  console.log(aktuality);

  expect(aktuality.length).toEqual(2);
});
