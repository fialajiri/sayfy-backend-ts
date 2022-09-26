import { Request, Response } from "express";
import { DatabaseConnectionError } from "../../errors/database-connection-error";
import { Aktualita } from "../../models/aktualita/aktualita";

const createAktualita = async (req: Request, res: Response) => {
  const { title, perex, text, mainPhoto, photoGallery, video, imagesFromEditor } = req.body;

  const newAktualita = Aktualita.build({
    title,
    perex,
    text,
    mainPhoto,
    photoGallery,
    video,
    imagesFromEditor,
  });

  try {
    await newAktualita.save();
  } catch (err) {
    throw new DatabaseConnectionError("Aktualitu se nepodařilo uložit");
  }

  res.status(201).send(newAktualita);
};

export default createAktualita;
