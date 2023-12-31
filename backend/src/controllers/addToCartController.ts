import { Request, Response } from "express";
import cartItemSchema, { CartItem } from "../models/cartItemSchema";
import productSchema, { Product } from "../models/productSchema";
import validationError from "../helper/validationError";
import userSchema, { UserProps } from "../models/userSchema";

const addToCart = async (req: Request, res: Response) => {
  try {
    const { productId, quantity, color, size, userId } = req.body;

    const user: UserProps = await userSchema
      .findById(userId)
      .populate("cartItems");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const product: Product = await productSchema.findById(productId);

    if (!product) {
      res.status(404).json({ message: "Product not found" });
      return;
    }

    const cartItemData: CartItem = {
      productId: product._id,
      quantity,
      productName: product.productName,
      price: product.price,
      color,
      size,
    };

    const cartItem: CartItem = await cartItemSchema.create(cartItemData);

    await userSchema.findByIdAndUpdate(userId, {
      $push: { cartItems: cartItem._id },
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

const getCartItems = async (req: Request, res: Response) => {
  try {
    const cartItem = await cartItemSchema.find();

    if (!cartItem) {
      res.status(404).json({ message: "Not product found" });
    }
    res.status(201).json(cartItem);
  } catch (error) {
    if (error.name === "ValidationError" && error.errors) {
      return validationError(error, res);
    }

    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

export { addToCart, getCartItems };
