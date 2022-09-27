import { Request, Response } from "express";
import { DatabaseConnectionError } from "../../errors/database-connection-error";
import { NotFoundError } from "../../errors/not-found-error";
import { Gallery, GalleryDoc } from "../../models/gallery/gallery";

const deleteGallery = async (req: Request, res: Response) => {
  const { galleryId } = req.params;

  let gallery: (GalleryDoc & { _id: any }) | null;

  try {
    gallery = await Gallery.findById(galleryId);
  } catch (err) {
    throw new DatabaseConnectionError();
  }

  if (!gallery) {
    throw new NotFoundError();
  }

  try {
    await gallery.deleteOne();
  } catch (err) {
    throw new DatabaseConnectionError("Galerii se nepodařilo smazat");
  }

  res.status(200).send();
};

export default deleteGallery;
