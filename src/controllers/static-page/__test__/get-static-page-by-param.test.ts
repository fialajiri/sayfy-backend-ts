import request from "supertest";
import { app } from "../../../app";

it("return 404 if the provided param does not exists", async () => {
  const staticPageUrl = "this-shloud-not-exits";

  await request(app).get(`/api/static-page/${staticPageUrl}`).send().expect(200);
});

it("returns 200 and fetches static page provided valid static page id", async () => {
  const { body: staticPage } = await request(app)
    .post("/api/static-page")
    .set("Cookie", global.signin(true))
    .send({
      title: "This is the static page title",
      perex: "This is perex",
      text: "This is text",
      assets: ["image1-path", "document1-path"],
    })
    .expect(201);

  const { body: fetchedStaticPage } = await request(app)
    .get(`/api/static-page/${staticPage.id}`)
    .send()
    .expect(200);

  console.log(fetchedStaticPage);

  expect(fetchedStaticPage).not.toBeNull();
});

it("returns 200 and fetches a static page provided a valid static page url", async () => {
  const { body: staticPage } = await request(app)
    .post("/api/static-page")
    .set("Cookie", global.signin(true))
    .send({
      title: "This is the static page title",
      perex: "This is perex",
      text: "This is text",
      assets: ["image1-path", "document1-path"],
    })
    .expect(201);

  const { body: fetchedStaticPage } = await request(app)
    .get(`/api/static-page/${staticPage.staticPageUrl}`)
    .send()
    .expect(200);

  console.log(fetchedStaticPage);

  expect(fetchedStaticPage).not.toBeNull();
});
