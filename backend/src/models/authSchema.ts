import { NextFunction } from "express";
import bcrypt from "bcrypt";
import { model, Schema, Types, Document, Model } from "mongoose";
import isEmail from "validator/lib/isEmail";

export interface UserProps {
  username: string;
  email: string;
  password: string;
  shoppingCart: Types.ObjectId;
}
interface userModal extends Model<UserProps & Document> {
  checkCredentials(email: string, password: string): Promise<UserProps>;
}

const userSchema: Schema<UserProps> = new Schema({
  username: {
    type: String,
    required: [true, "Username is required"],
    unique: true,
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    lowercase: true,
    validate: [isEmail, "Please enter a valid email"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: [5, "Minimum password length is 6 characters"],
  },
  shoppingCart: {
    type: Schema.Types.ObjectId,
    ref: "cartItem",
  },
});

userSchema.pre("save", async function (next: NextFunction) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);

  next();
});

userSchema.statics.checkCredentials = async function (
  this: userModal,
  email: string,
  password: string
) {
  const user = await this.findOne({ email });

  if (user) {
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (isValidPassword) {
      return user;
    }
    throw Error("Invalid password");
  }
  throw new Error("Incorrect email");
};

export default model<UserProps, userModal>("user", userSchema);
