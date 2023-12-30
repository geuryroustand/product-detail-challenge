import { model, Schema, Types } from "mongoose";

export interface CartItem {
  productId: Types.ObjectId;
  _id?: Types.ObjectId;
  quantity: number;
  productName: string;
  price: number;
  color: string;
  size: string;
}

const CartItemSchema: Schema<CartItem> = new Schema({
  productId: {
    type: Schema.Types.ObjectId,
    ref: "product",
    required: [true, "Product ID is required."],
  },
  quantity: {
    type: Number,
    required: [true, "Quantity is required."],
    default: 1,
  },
  productName: {
    type: String,
    required: [true, "productName is required."],
  },
  price: {
    type: Number,
    required: [true, "Price is required."],
  },
  color: {
    type: String,
    required: [true, "Color is required."],
  },
  size: {
    type: String,
    required: [true, "Size is required."],
  },
});

export default model<CartItem>("cartItem", CartItemSchema);
