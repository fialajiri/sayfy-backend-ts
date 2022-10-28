import mongoose from "mongoose";
import { normalizeStringToUrl } from "../../utils/string-utils";

export interface StaticPageAttrs {
  title: string;
  text: string;
  assets: string[];
}

interface StaticPageModel extends mongoose.Model<StaticPageDoc> {
  build(attrs: StaticPageAttrs): StaticPageDoc;
}

export interface StaticPageDoc extends mongoose.Document {
  title: string;
  text: string;
  assets: string[];
  updatedAt: Date;
  createdAt: Date;
}

const staticPageSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    text: { type: String },
    assets: [{ type: String }],
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
staticPageSchema.statics.build = (attrs: StaticPageAttrs) => {
  return new StaticPage(attrs);
};

const StaticPage = mongoose.model<StaticPageDoc, StaticPageModel>("StaticPage", staticPageSchema);

export { StaticPage };
