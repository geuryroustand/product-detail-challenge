import { Request, Response } from "express";

import authSchema, { UserProps } from "../models/authSchema";
import validationError from "../helper/validationError";

const signupUser = async (req: Request, res: Response): Promise<void> => {
  const { username, email, password }: UserProps = req.body;

  try {
    const existingUser = await authSchema.findOne({
      $or: [{ username }, { email }],
    });
    if (existingUser) {
      res.status(400).json({ message: "Username or email already exists" });
      return;
    }

    const newUser = new authSchema({ username, email, password });

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
    const user = await authSchema.checkCredentials(email, password);

    res.status(200).json({ message: "Login successful", user });
  } catch (error) {
    res.status(500).json({ message: "Error logging in", error: error.message });
  }
};

export { signupUser, loginUser };
