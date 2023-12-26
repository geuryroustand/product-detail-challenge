import { Response } from "express";
import { Error } from "mongoose";

const validationError = (error: Error.ValidationError, res: Response) => {
  const validationErrors: any = {};

  if (error.errors) {
    Object.keys(error.errors).forEach((key: string) => {
      validationErrors[key] = error.errors[key].message;
    });

    return res
      .status(400)
      .json({ message: "Validation failed.", errors: validationErrors });
  }

  return res
    .status(400)
    .json({ message: "Validation failed.", error: error.message });
};

export default validationError;
