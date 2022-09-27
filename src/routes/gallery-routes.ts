import express from "express";
import { body, CustomValidator } from "express-validator";

import { requireAdmin } from "../middlewares/require-admin";
import { validateRequest } from "../middlewares/validate-request";

import createGallery from "../controllers/gallery/create-gallery";
import updateGallery from "../controllers/gallery/update-gallery";
import getGalleryByUrl from "../controllers/gallery/get-gallery-by-url";
import getGalleries from "../controllers/gallery/get-galeries";
import deleteGallery from "../controllers/gallery/delete-gallery";
import { Gallery } from "../models/gallery/gallery";

const router = express.Router();

const isTitleUnique: CustomValidator = async (value) => {
  const gallery = await Gallery.findOne({ title: value });
  if (gallery) {
    return Promise.reject("Název gallerie musí být unikátní");
  }
};

const galleryValidation = [
  body("title").trim().not().isEmpty().isLength({ max: 150 }).custom(isTitleUnique),
];

router.post("/api/gallery", requireAdmin, galleryValidation, validateRequest, createGallery);
router.put("/api/gallery", requireAdmin, galleryValidation, validateRequest, updateGallery);
router.get("/api/gallery/:galleryUrl", getGalleryByUrl);
router.get("/api/gallery", getGalleries);
router.delete("/api/gallery/:galleryId", deleteGallery);

export { router as galleryRoutes };
