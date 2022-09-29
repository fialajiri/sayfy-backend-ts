import mongoose from "mongoose";
import { Password } from "../../services/password";

export interface UserAttrs {
  email: string;
  password: string;
  username: string;
}

interface UserModel extends mongoose.Model<UserDoc> {
  build(attrs: UserAttrs): UserDoc;
}

export interface UserDoc extends mongoose.Document {
  email: string;
  isAdmin: boolean;
  password: string;
  username: string;
  udpatedAt: Date;
  createdAt: Date;
}

const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, default: false },
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

userSchema.pre("save", async function (done) {
  if (this.isModified("password")) {
    const hashed = await Password.generatePassword(this.get("password"));
    this.set("password", hashed);
  }

  done();
});

userSchema.statics.build = (attrs: UserAttrs) => {
  return new User(attrs);
};

const User = mongoose.model<UserDoc, UserModel>("User", userSchema);

export { User };
