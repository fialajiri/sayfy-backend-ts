import express from "express";
import { body } from "express-validator";
import createAktualita from "../controllers/aktualita/create-aktualita";
import getAktualitaById from "../controllers/aktualita/get-aktualita-by-id";
import getAktuality from "../controllers/aktualita/get-aktuality";
import updateAktualita from "../controllers/aktualita/update-aktualita";
import { validateRequest } from "../middlewares/validate-request";

const router = express.Router();

const aktualitaValidation = [
  body("title")
    .trim()
    .not()
    .isEmpty()
    .isLength({ max: 100 })
    .withMessage("Nadpis nesmý být prázdný a jeho maximální délka nesmí přesáhnout 100 znaků"),
  body("perex")
    .trim()
    .not()
    .isEmpty()
    .isLength({ max: 500 })
    .withMessage("Peres nesmý být prázdný a jeho maximální délka nesmí přesáhnout 100 znaků"),
  body("mainPhoto").not().isEmpty().withMessage("Aktualita musí mít alespoň hlavní obrázek"),
];

router.post("/api/aktualita", aktualitaValidation, createAktualita);
router.put("/api/aktualita/:aktualitaId", aktualitaValidation, updateAktualita);
router.get("/api/aktualita", getAktuality);
router.get("/api/aktualita/:aktualitaId", getAktualitaById);
router.delete("/api/aktualita/:aktualitaId");

export { router as aktualitaRoutes };
