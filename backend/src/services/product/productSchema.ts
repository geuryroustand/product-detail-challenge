import mongoose from "mongoose";

const { model, Schema } = mongoose;

const productSchema = new Schema({
  productName: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  colors: {
    type: [String],
    required: true,
  },
  sizes: {
    type: [String],
    required: true,
  },
  productDescription: {
    type: String,
    required: true,
  },
});

export default model("product", productSchema);
