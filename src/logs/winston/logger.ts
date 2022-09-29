import { createLogger, format } from "winston";
import { MongoDbTransport } from "./winston-transport";

export const logger = createLogger({
  level: "info",
  format: format.json(),
  transports: [new MongoDbTransport({})],
});
