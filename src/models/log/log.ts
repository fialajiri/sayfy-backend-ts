import mongoose, { Schema } from "mongoose";
import { userPayload } from "../../services/jwt";

export interface LogAttrs {
  level?: string;
  method?: string;
  url?: string;
  status?: number;
  currentUser?: userPayload;
  responseTime?: string;
  ip?: string | string[];
  requestBody?: string;
  sendData?: string;
  error?: {
    errorMsg?: string;
    errorFields?: string;
  }[];
}

interface LogModel extends mongoose.Model<LogDoc> {
  build(attrs: LogAttrs): LogDoc;
}

export interface LogDoc extends mongoose.Document {
  level: string;
  method: string;
  url: string;
  status: number;
  currentUser: userPayload;
  responseTime: string;
  ip: string;
  requestBody: string;
  sendData: string;
  error: {
    errorMsg: string;
    errorFields: string;
  }[];
  udpatedAt: Date;
  createdAt: Date;
}

const logSchema = new mongoose.Schema(
  {
    level: { type: String },
    method: { type: String },
    url: { type: String },
    status: { type: Number },
    currentUser: {
      id: { type: String },
      email: { type: String },
      isAdmin: { type: Boolean },
    },
    responseTime: { type: String },
    ip: { type: String },
    requestBody: { type: String },
    sendData: { type: String },
    error: [
      {
        errorMsg: { type: String },
        errorFields: { type: String },
      },
    ],
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

logSchema.statics.build = (attrs: LogAttrs) => {
  return new Log(attrs);
};

const Log = mongoose.model<LogDoc, LogModel>("Log", logSchema);

export { Log };
