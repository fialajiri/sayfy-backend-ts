import Transport from "winston-transport";

import TransportStream from "winston-transport";
import { LogAttrs, Log } from "../../models/log/log";

class MongoDbTransport extends Transport {
  constructor(options?: TransportStream.TransportStreamOptions) {
    super(options);
  }

  public async log(info: any, next: () => void) {        
    const message = { level: info.level, ...info.message } as LogAttrs;

    const newLog = Log.build(message);
    try {
      await newLog.save();
    } catch (err) {}

    next();
  }
}

export { MongoDbTransport };
