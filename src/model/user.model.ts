import mongoose from "mongoose";
import { UserRegistrationInterface } from "../schema/user.interface";
import bcrypt from "bcrypt";
import config from "../config/config";

const Schema = mongoose.Schema;

export const userSchema = new Schema({
  first_name: {
    type: String,
    required: false,
    default: null,
    maxlength: 50,
  },
  last_name: {
    type: String,
    required: false,
    default: null,
    maxlength: 50,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    maxlength: 50,
  },
  hashed_password: {
    type: String,
    required: true,
  },
});
userSchema.set("timestamps", true);
userSchema
  .virtual("password")
  .get(function () {
    return `${this.hashed_password}`;
  })
  .set(function (password) {
    const hashed_password = this.encryptPassword(password);
    this.set({ hashed_password });
  });

userSchema.method({
  encryptPassword: function (password: string) {
    if (!password) return "";
    try {
      const bcryptSalt = config.BCRYPT_SALT;
      return bcrypt.hashSync(password, bcryptSalt);
    } catch (err) {
      return "";
    }
  },
});
export const User = mongoose.model("User", userSchema);
