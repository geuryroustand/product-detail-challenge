import { Request, Response } from "express";

import userSchema, { UserProps } from "../models/userSchema";
import validationError from "../helper/validationError";

const signupUser = async (req: Request, res: Response): Promise<void> => {
  const { username, email, password }: UserProps = req.body;

  try {
    const existingUser = await userSchema.findOne({
      $or: [{ username }, { email }],
    });
    if (existingUser) {
      res.status(400).json({ message: "Username or email already exists" });
      return;
    }

    const newUser = new userSchema({ username, email, password });

    await newUser.save();

    res
      .status(201)
      .json({ message: "User created successfully", user: newUser });
  } catch (error) {
    if (error.name === "ValidationError" && error.errors) {
      return validationError(error, res);
    }

    res
      .status(500)
      .json({ message: "Error creating user", error: error.message });
  }
};
const loginUser = async (req: Request, res: Response): Promise<void> => {
  const { email, password }: { email: string; password: string } = req.body;

  try {
    const user = await userSchema.checkCredentials(email, password);

    if (user.message === "Invalid password") {
      res.status(401).json({ password: "Invalid password" });
      return;
    }

    if (user.message === "Incorrect email") {
      res.status(401).json({ email: "Incorrect email" });
      return;
    }

    res.status(200).json({ message: "Login successful", user });
  } catch (error) {
    res.status(500).json({ message: "Error logging in", error: error.message });
  }
};

const getUserById = async (req: Request, res: Response) => {
  const productId: string = req.params.id;

  try {
    const user: UserProps = await userSchema
      .findById(productId)
      .populate("cartItems");

    if (!user) {
      return res.status(404).send({ error: "User not found." });
    }

    res.status(200).json(user);
  } catch (error) {
    if (error.name === "ValidationError" && error.errors) {
      return validationError(error, res);
    }

    res
      .status(500)
      .json({ message: "Failed to fetch product.", error: error.message });
  }
};

export { signupUser, loginUser, getUserById };
