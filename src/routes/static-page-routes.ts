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

const isTitleUnique: CustomValidator = async (value, { req }) => {
  const staticPageId: string | undefined = req.params?.galleryId;
  const staticPage = await StaticPage.findOne({ title: value });
  if (staticPage && (staticPage._id.toHexString() !== staticPageId || staticPageId === undefined)) {
    return Promise.reject("Název statické stránky musí být unikátní");
  }
};

const staticPageValidaton = [
  body("title").trim().not().isEmpty().isLength({ max: 150 }).custom(isTitleUnique),
];

router.post(
  "/api/static-page",
  requireAdmin,
  staticPageValidaton,
  validateRequest,
  createStaticPage
);
router.put(
  "/api/static-page/:staticPageId",
  requireAdmin,
  staticPageValidaton,
  validateRequest,
  updateStaticPage
);
router.get("/api/static-page/:staticPageParam", getStaticPageByParam);
router.delete("/api/static-page/:staticPageId", requireAdmin, deleteStaticPage);

export { router as staticPageRoutes };
