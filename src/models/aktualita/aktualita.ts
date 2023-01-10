import mongoose from "mongoose";
import { normalizeStringToUrl } from "../../utils/string-utils";

export interface AktualitaAttrs {
  title: string;  
  text: string;
  mainPhoto: string;
  photoGallery: string[];
  filesFromEditor: string[];
}

interface AktualitaModel extends mongoose.Model<AktualitaDoc> {
  build(attrs: AktualitaAttrs): AktualitaDoc;
}

export interface AktualitaDoc extends mongoose.Document {
  title: string; 
  text: string;
  mainPhoto: string;
  aktualitaUrl: string;
  photoGallery: string[];
  filesFromEditor: string[];
  updatedAt: Date;
  createdAt: Date;
}

const aktualitaSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },   
    text: { type: String },
    mainPhoto: { type: String, required: true },
    photoGallery: [{ type: String }],
    filesFromEditor: [{ type: String }],
    aktualitaUrl: {
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

aktualitaSchema.pre("save", async function (done) {
  if (this.isModified("title")) {
    this.set("staticPageUrl", normalizeStringToUrl(this.get("title")));
  }
});

aktualitaSchema.statics.build = (attrs: AktualitaAttrs) => {
  return new Aktualita(attrs);
};

const Aktualita = mongoose.model<AktualitaDoc, AktualitaModel>("Aktualita", aktualitaSchema);

export { Aktualita };
