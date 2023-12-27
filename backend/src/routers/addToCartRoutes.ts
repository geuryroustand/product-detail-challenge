import { addToCart, getCartItems } from "../controllers/addToCartController";
import { Router } from "express";

const addToCartRouter = Router();

addToCartRouter.post("/", addToCart);
addToCartRouter.get("/", getCartItems);

export default addToCartRouter;
