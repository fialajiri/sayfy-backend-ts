import express from "express";
import { body } from "express-validator";

import { validateRequest } from "../middlewares/validate-request";
import getCurrentUser from "../controllers/user/current-user";
import signup from "../controllers/user/signup";
import signin from "../controllers/user/signin";
import signout from "../controllers/user/signout";

const router = express.Router();

router.post(
  "/api/users/signup",
  [
    body("email").isEmail().withMessage("Zadejte platný email"),
    body("password").trim().notEmpty().withMessage("Heslo nesmí být prázdné"),
    body("username")
      .trim()
      .isLength({ min: 1, max: 100 })
      .withMessage("Uživatelské jméno nesmí být prázdné. Maximální délka je 100 znaků"),
  ],
  validateRequest,
  signup
);

router.post(
  "/api/users/signin",
  [
    body("email").isEmail().withMessage("Zadejte platný email"),
    body("password").trim().notEmpty().withMessage("Heslo nesmí být prázdné"),
  ],
  validateRequest,
  signin
);

router.post("/api/users/signout", signout);

router.get("/api/users/currentuser", getCurrentUser);

export { router as userRoutes };
