import { model, Schema } from "mongoose";

export interface Product {
  productName: string;
  price: number;
  quantity: number;
  colors: string[];
  sizes: string[];
  productDescription: string;
  image: string;
}

const productSchema: Schema<Product> = new Schema({
  productName: {
    type: String,
    required: [true, "Product Name is required."],
  },
  price: {
    type: Number,
    required: [true, "Price is required."],
  },
  quantity: {
    type: Number,
    required: [true, "Quantity is required."],
  },
  colors: {
    type: [String],
    required: [true, "Colors are required."],
    validate: {
      validator: (colorsArray: string[]) => colorsArray.length > 0,
      message: "At least one color is required.",
    },
  },
  sizes: {
    type: [String],
    required: [true, "Sizes are required."],
    validate: {
      validator: (sizesArray: string[]) => sizesArray.length > 0,
      message: "At least one size is required.",
    },
  },
  productDescription: {
    type: String,
    required: [true, "Product Description is required."],
  },
  image: {
    type: String,
    required: [true, "Product image is required."],
  },
});

export default model<Product>("product", productSchema);
