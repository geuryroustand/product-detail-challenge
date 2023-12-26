import { Request, Response } from "express";
import cartItemSchema, { CartItem } from "../models/cartItemSchema";
import productSchema, { Product } from "../models/productSchema";
import validationError from "../helper/validationError";

const addToCart = async (req: Request, res: Response) => {
  try {
    const { id, quantity, color, title, price, size } = req.body;

    const product: Product = await productSchema.findById(id);

    if (!product) {
      res.status(404).json({ message: "Product not found" });
      return;
    }

    if (!quantity || !color || !title || !price || !size) {
      return;
    }

    const cartItem: CartItem = await cartItemSchema.create({
      id,
      quantity,
      color,
      title,
      price,
      size,
    });

    res
      .status(201)
      .json({ message: "Product added to cart successfully", cartItem });
  } catch (error) {
    if (error.name === "ValidationError" && error.errors) {
      return validationError(error, res);
    }

    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

export { addToCart };
