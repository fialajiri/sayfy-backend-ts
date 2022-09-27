import { Request, Response } from "express";
import { DatabaseConnectionError } from "../../errors/database-connection-error";
import { Gallery } from "../../models/gallery/gallery";

const createGallery = async (req: Request, res: Response) => {
  const { title, images } = req.body;

  const newGallery = Gallery.build({
    title,
    images,
  });

  try {
    await newGallery.save();
  } catch (err) {
    throw new DatabaseConnectionError("Gallerii se nepodařilo uložit");
  }

  res.status(201).send(newGallery);
};

export default createGallery;
