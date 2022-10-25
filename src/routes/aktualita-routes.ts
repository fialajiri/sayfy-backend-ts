import express from "express";
import { body, CustomValidator } from "express-validator";
import { requireAdmin } from "../middlewares/require-admin";
import { validateRequest } from "../middlewares/validate-request";

import createAktualita from "../controllers/aktualita/create-aktualita";
import deleteAktualita from "../controllers/aktualita/delete-aktualita";
import getAktualitaByParam from "../controllers/aktualita/get-aktualita-by-param";
import getAktuality from "../controllers/aktualita/get-aktuality";
import updateAktualita from "../controllers/aktualita/update-aktualita";
import { Aktualita } from "../models/aktualita/aktualita";

const router = express.Router();

const isTitleUnique: CustomValidator = async (value, { req }) => {
  const staticPageId: string | undefined = req.params?.galleryId;
  const staticPage = await Aktualita.findOne({ title: value });
  if (staticPage && (staticPage._id.toHexString() !== staticPageId || staticPageId === undefined)) {
    return Promise.reject("Název statické stránky musí být unikátní");
  }
};

const aktualitaValidation = [
  body("title")
    .trim()
    .not()
    .isEmpty()
    .isLength({ max: 150 })
    .withMessage("Nadpis nesmý být prázdný a jeho maximální délka nesmí přesáhnout 150 znaků")
    .custom(isTitleUnique),
  body("perex")
    .trim()
    .not()
    .isEmpty()
    .isLength({ max: 500 })
    .withMessage("Perex nesmý být prázdný a jeho maximální délka nesmí přesáhnout 500 znaků"),
  body("mainPhoto").not().isEmpty().withMessage("Aktualita musí mít alespoň hlavní obrázek"),
];

router.post("/api/aktualita", requireAdmin, aktualitaValidation, validateRequest, createAktualita);
router.put(
  "/api/aktualita/:aktualitaId",
  requireAdmin,
  aktualitaValidation,
  validateRequest,
  updateAktualita
);
router.get("/api/aktualita", getAktuality);
router.get("/api/aktualita/:aktualitaParam", getAktualitaByParam);
router.delete("/api/aktualita/:aktualitaId", requireAdmin, deleteAktualita);

export { router as aktualitaRoutes };
