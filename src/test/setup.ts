import { MongoMemoryReplSet } from "mongodb-memory-server";
import mongoose from "mongoose";
import { jwtService } from "../services/jwt";

declare global {
  var signin: (isAdmin: boolean, userId?: string) => string[];
}

let replset: MongoMemoryReplSet;

beforeAll(async () => {
  process.env.JWT_SECRET = "my_secret_key";
  process.env.JWT_EXPIRY = "1000";
  process.env.REFRESH_TOKEN_EXPIRY = "1000";
  process.env.COOKIE_SECRET = "cookie_secret";

  replset = await MongoMemoryReplSet.create({
    replSet: { storageEngine: "wiredTiger" },
  });
  await replset.waitUntilRunning();
  const uri = replset.getUri();

  await mongoose.connect(uri);
});

beforeEach(async () => {
  jest.setTimeout(10000);
  const collections = await mongoose.connection.db.collections();

  for (const collection of collections) {
    await collection.deleteMany({});
  }
});

afterAll(async () => {
  await mongoose.connection.close();
  await replset.stop();
  await replset.cleanup();
});

global.signin = (isAdmin: boolean, userId?: string) => {
  // Build a JWT payload.  { id, email }
  const payload = {
    id: userId || new mongoose.Types.ObjectId().toHexString(),
    email: "test@test.com",
    isAdmin: isAdmin,
  };

  // Create a JWT
  const token = jwtService.getToken(payload);

  // Build a session Object
  const session = { jwt: token };
  const sessionJSON = JSON.stringify(session);

  // Take JSON and endode it as base64
  const base64 = Buffer.from(sessionJSON).toString("base64");

  // return a string thats the cookie with the encoded data
  return [`cookie=${sessionJSON}`];
};