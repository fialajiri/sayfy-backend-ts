import { Request, Response } from "express";
import { DatabaseConnectionError } from "../../errors/database-connection-error";
import { NotFoundError } from "../../errors/not-found-error";
import { Gallery, GalleryDoc } from "../../models/gallery/gallery";
import { deleteFileFromS3 } from "../../utils/delete-file-from-s3";

const updateGallery = async (req: Request, res: Response) => {
  const { galleryId } = req.params;
  const { title, images: newImages } = req.body;

  

  let gallery: (GalleryDoc & { _id: any }) | null;

  try {
    gallery = await Gallery.findById(galleryId);
  } catch (err) {
    throw new DatabaseConnectionError();
  }

  if (!gallery) {
    throw new NotFoundError();
  }

  const existingImages = gallery.images;
  const imagesToDelete = existingImages.filter((img) => !newImages.includes(img));

  for(const image of imagesToDelete){
    await deleteFileFromS3(image)
    
  }

  gallery.set({ title, images:newImages });

  try {
    await gallery.save();
  } catch (err) {
    throw new DatabaseConnectionError("Galerii se nepodařilo updatovat");
  }

  res.status(200).send(gallery);
};

export default updateGallery;
