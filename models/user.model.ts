import mongoose from "mongoose";
import { Document, Model, Schema } from "mongoose";

const userSchema = new Schema({
  fullName: { type: String},
  email: { type: String },
  password: { type: String},
  token: { type: String },
  deleted: { type: Boolean , default: false },
  deletedAt: { type: Date },
},{
    timestamps: true,
});

const User = mongoose.model("User", userSchema , "users");

export default User;
