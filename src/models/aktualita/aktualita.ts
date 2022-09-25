import mongoose from "mongoose";

export interface AktualitaAttrs {
  title: string;
  perex: string;
  text: string;
  mainPhoto: string;
  photoGallery: string[];
  video: string;
  imagesFromEditor: string[];
}

interface AktualitaModel extends mongoose.Model<AktualitaDoc> {
  build(attrs: AktualitaAttrs): AktualitaDoc;
}

export interface AktualitaDoc extends mongoose.Document {
  title: string;
  perex: string;
  text: string;
  mainPhoto: string;
  photoGallery: string[];
  video: string;
  imagesFromEditor: string[];
  updatedAt: Date;
  createdAt: Date;
}

const aktualitaSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    perex: { type: String, required: true },
    text: { type: String },
    mainPhoto: { type: String, required: true },
    photoGallery: [{ type: String }],
    video: { type: String },
    imagesFromEditor: [{ type: String }],
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

aktualitaSchema.statics.build = (attrs: AktualitaAttrs) => {
  return new Aktualita(attrs);
};

const Aktualita = mongoose.model<AktualitaDoc, AktualitaModel>("Aktualita", aktualitaSchema);

export { Aktualita };
