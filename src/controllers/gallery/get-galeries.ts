import { Request, Response } from "express";
import { DatabaseConnectionError } from "../../errors/database-connection-error";
import { Gallery, GalleryDoc } from "../../models/gallery/gallery";

const getGalleries = async (req: Request, res: Response) => {
  let galleries: (GalleryDoc & { _id: any })[] | null;

  try {
    galleries = await Gallery.find();
  } catch (err) {
    throw new DatabaseConnectionError();
  }

  res.status(200).send(galleries);
};

export default getGalleries;
