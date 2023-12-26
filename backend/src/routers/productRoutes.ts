import { createProduct, getProducts } from "../controllers/productController";
import { Router } from "express";

const productRouter = Router();

productRouter.post("/", createProduct);
productRouter.get("/", getProducts);

export default productRouter;
