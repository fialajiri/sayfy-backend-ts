import { Request, Response } from "express";
import { DatabaseConnectionError } from "../../errors/database-connection-error";
import { NotFoundError } from "../../errors/not-found-error";
import { Gallery, GalleryDoc } from "../../models/gallery/gallery";

const getGalleryByUrl = async (req: Request, res: Response) => {
  const { galleryUrl } = req.params;

  let gallery: (GalleryDoc & { _id: any }) | null;

  try {
    gallery = await Gallery.findOne({ galleryUrl: galleryUrl });
  } catch (err) {
    throw new DatabaseConnectionError();
  }

  if (!gallery) {
    throw new NotFoundError();
  }

  res.status(200).send(gallery);
};

export default getGalleryByUrl;
