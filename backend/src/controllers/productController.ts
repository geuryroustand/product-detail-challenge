import { Response, Request } from "express";
import productSchema, { Product } from "../models/productSchema";
import validationError from "../helper/validationError";

const createProduct = async (req: Request, res: Response) => {
  try {
    const newProduct: Product = await productSchema.create(req.body);

    res.status(201).json(newProduct);
  } catch (error) {
    if (error.name === "ValidationError" && error.errors) {
      return validationError(error, res);
    }

    res
      .status(500)
      .json({ message: "Failed to create product.", error: error.message });
  }
};

const getProducts = async (req: Request, res: Response) => {
  try {
    const products: Product[] = await productSchema.find();
    res.status(200).json(products);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch products.", error: error.message });
  }
};

const getProductById = async (req: Request, res: Response) => {
  const productId: string = req.params.id;

  try {
    const product: Product = await productSchema.findById(productId);

    if (!product) {
      return res.status(404).json({ message: "Product not found." });
    }

    res.status(200).json(product);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch product.", error: error.message });
  }
};

export { createProduct, getProducts, getProductById };
