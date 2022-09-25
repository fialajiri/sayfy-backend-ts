import { CustomError } from "./custom-errors";

export class NotFoundError extends CustomError {
  statusCode = 404;

  constructor() {
    super("Hledaný objekt nebo hledaná cesta nebyl/a nalezen/a");

    Object.setPrototypeOf(this, NotFoundError.prototype);
  }

  serializeError() {
    return [{ message: "Cesta nenalezena" }];
  }
}
