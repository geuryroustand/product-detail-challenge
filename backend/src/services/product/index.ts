import express from "express";
import productSchema from "./productSchema";

const product = express.Router();

product.post("/", async (req, res) => {
  const { productName, price, quantity, colors, sizes, productDescription } =
    req.body;

  if (
    !productName ||
    !price ||
    !quantity ||
    !colors ||
    !sizes ||
    !productDescription
  ) {
    console.log({
      productName,
      price,
      quantity,
      colors,
      sizes,
      productDescription,
    });
  }
  const newProduct = await productSchema.create(req.body);
  console.log("req", req.body);

  res.send(newProduct);
});

export default product;
