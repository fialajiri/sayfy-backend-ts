import mongoose from "mongoose";

export interface GalleryAttrs {
  title: string;
  images: string[];
}

interface GalleryModel extends mongoose.Model<GalleryDoc> {
  build(attrs: GalleryAttrs): GalleryDoc;
}

export interface GalleryDoc extends mongoose.Document {
  title: string;
  images: string[];
  galleryUrl: string;
  updatedAt: Date;
  createdAt: Date;
}

const gallerySchema = new mongoose.Schema(
  {
    title: { type: String, required: true, unique: true },
    images: [{ type: String }],
    galleryUrl: {
      type: String,
      default: function () {
        const _t = this as any;
        return normalizeStringToUrl(_t.title);
      },
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform(doc, ret) {
        (ret.id = ret._id), delete ret._id, delete ret.__v;
      },
    },
  }
);

gallerySchema.statics.build = (attrs: GalleryDoc) => {
  return new Gallery(attrs);
};

const Gallery = mongoose.model<GalleryDoc, GalleryModel>("Gallery", gallerySchema);

export { Gallery };
