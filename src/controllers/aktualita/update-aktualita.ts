import { Request, Response } from "express";
import { DatabaseConnectionError } from "../../errors/database-connection-error";
import { NotFoundError } from "../../errors/not-found-error";
import { Aktualita, AktualitaDoc } from "../../models/aktualita/aktualita";

const updateAktualita = async (req: Request, res: Response) => {
  const { aktualitaId } = req.params;
  const { title, perex, text, mainPhoto, photoGallery, video, imagesFromEditor } = req.body;

  let aktualita: (AktualitaDoc & { _id: any }) | null;

  try {
    aktualita = await Aktualita.findById(aktualitaId);
  } catch (err) {
    throw new DatabaseConnectionError();
  }

  if (!aktualita) {
    throw new NotFoundError();
  }

  aktualita.set({ title, perex, text, mainPhoto, photoGallery, video, imagesFromEditor });

  try {
    await aktualita.save();
  } catch (err) {
    throw new DatabaseConnectionError();
  }

  res.status(200).send(aktualita);
};

export default updateAktualita
