import { Request, Response } from "express";
import { DatabaseConnectionError } from "../../errors/database-connection-error";
import { NotFoundError } from "../../errors/not-found-error";
import { Gallery, GalleryDoc } from "../../models/gallery/gallery";

const updateGallery = async (req: Request, res: Response) => {
  const { galleryId } = req.params;
  const { title, images } = req.body;

  let gallery: (GalleryDoc & { _id: any }) | null;

  try {
    gallery = await Gallery.findById(galleryId);
  } catch (err) {
    throw new DatabaseConnectionError();
  }

  if (!gallery) {
    throw new NotFoundError();
  }

  gallery.set({ title, images });

  try {
    await gallery.save();
  } catch (err) {
    throw new DatabaseConnectionError("Galerii se nepodařilo updatovat");
  }

  res.status(200).send(gallery);
};

export default updateGallery
