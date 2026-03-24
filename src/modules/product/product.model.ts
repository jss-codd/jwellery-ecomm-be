import { Schema, model, type InferSchemaType } from "mongoose";

const productSchema = new Schema(
  {
    name: { type: String, required: true, trim: true, minlength: 2, maxlength: 120 },
    price: { type: Number, required: true, min: 0 },
    stock: { type: Number, required: true, min: 0 },
    category: { type: String, required: true, trim: true, minlength: 2, maxlength: 50 },
  },
  {
    versionKey: false,
    timestamps: true,
  },
);

export type ProductDocument = InferSchemaType<typeof productSchema> & { _id: string };

export const ProductModel = model("Product", productSchema);
