import express from "express";
import { body } from "express-validator";
import { requireAdmin } from "../middlewares/require-admin";
import { validateRequest } from "../middlewares/validate-request";

import createAktualita from "../controllers/aktualita/create-aktualita";
import deleteAktualita from "../controllers/aktualita/delete-aktualita";
import getAktualitaById from "../controllers/aktualita/get-aktualita-by-id";
import getAktuality from "../controllers/aktualita/get-aktuality";
import updateAktualita from "../controllers/aktualita/update-aktualita";

const router = express.Router();

const aktualitaValidation = [
  body("title")
    .trim()
    .not()
    .isEmpty()
    .isLength({ max: 150 })
    .withMessage("Nadpis nesmý být prázdný a jeho maximální délka nesmí přesáhnout 100 znaků"),
  body("perex")
    .trim()
    .not()
    .isEmpty()
    .isLength({ max: 500 })
    .withMessage("Peres nesmý být prázdný a jeho maximální délka nesmí přesáhnout 100 znaků"),
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
router.get("/api/aktualita/:aktualitaId", getAktualitaById);
router.delete("/api/aktualita/:aktualitaId", requireAdmin, deleteAktualita);

export { router as aktualitaRoutes };
