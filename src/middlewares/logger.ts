import { Request, NextFunction, Response } from "express";
import { logger } from "../logs/winston/logger";
import { LogAttrs } from "../models/log/log";

export const requestLogger = (req: Request, res: Response, next: NextFunction) => {
  const logMessage: LogAttrs = {
    method: req.method,
    url: req.url,
    status: req.statusCode,
    currentUser: req.currentUser,
    requestBody: JSON.stringify(req.body),
    ip: req.headers["x-forwarded-for"] || req.socket.remoteAddress,
  };

  if (req.body.password) {
    delete logMessage.requestBody;
  }

  logger.info(logMessage);

  next();
};

export const responseLogger = (req:Request, res:Response, next:NextFunction) => {
  let send = res.send;
  res.send = (c) => {
    logger.info({
      sendData: c,
    });
    res.send = send;
    return res.send(c);
  };
  next();
}
