import { Request, Response, NextFunction } from "express";
import { CustomError } from "../errors/custom-errors";
import { logger } from "../logs/winston/logger";

export const errorHanlder = (err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof CustomError) {
    logger.error({
      error: err.serializeError(),
    });
    return res.status(err.statusCode).send({ errors: err.serializeError() });
  }

  console.log(err);
  res.status(400).send({ errors: [{ message: "Něco se pokazilo" }] });
};
