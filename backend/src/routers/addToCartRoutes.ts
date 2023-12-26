import { addToCart } from "../controllers/addToCartController";
import { Router } from "express";

const addToCartRouter = Router();

addToCartRouter.post("/", addToCart);

export default addToCartRouter;
