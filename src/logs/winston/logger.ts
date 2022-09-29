import { createLogger, format, config, transports } from "winston";
import { MongoDbTransport } from "./winston-transport";

export const logger = createLogger({
  level:'info',
  levels: config.npm.levels,
  format: format.json(),
  transports: [new MongoDbTransport()],
});
