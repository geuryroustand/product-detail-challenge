import {
  createProduct,
  getProductById,
  getProducts,
} from "../controllers/productController";
import { Router } from "express";

const productRouter = Router();

productRouter.post("/", createProduct);
productRouter.get("/", getProducts);
productRouter.get("/:id", getProductById);

export default productRouter;
