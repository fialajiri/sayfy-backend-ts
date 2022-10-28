import express from "express";
import { body, CustomValidator } from "express-validator";
import { requireAdmin } from "../middlewares/require-admin";
import { validateRequest } from "../middlewares/validate-request";
import createStaticPage from "../controllers/static-page/create-static-page";
import updateStaticPage from "../controllers/static-page/update-static-page";
import getStaticPageByParam from "../controllers/static-page/get-static-page-by-param";
import deleteStaticPage from "../controllers/static-page/delete-static-page";
import { StaticPage } from "../models/static-page/static-page";

const router = express.Router();

const staticPageValidation = [
  body("title")
    .trim()
    .not()
    .isEmpty()
    .isLength({ max: 150 })
    .withMessage("Nadpis nesmý být prázdný a jeho maximální délka nesmí přesáhnout 150 znaků"),
];

router.post(
  "/api/static-page",
  requireAdmin,
  staticPageValidation,
  validateRequest,
  createStaticPage
);
router.put(
  "/api/static-page/:staticPageId",
  requireAdmin,
  staticPageValidation,
  validateRequest,
  updateStaticPage
);
router.get("/api/static-page/:staticPageParam", getStaticPageByParam);
router.delete("/api/static-page/:staticPageId", requireAdmin, deleteStaticPage);

export { router as staticPageRoutes };
