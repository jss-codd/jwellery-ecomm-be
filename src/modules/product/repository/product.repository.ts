import type { CreateProductInput } from "../validation/product.validation";
import { ProductModel } from "../product.model";

export type Product = CreateProductInput & { id: string; createdAt: Date; updatedAt: Date };

export const productRepository = {
  findAll: async (): Promise<Product[]> => {
    const documents = await ProductModel.find().sort({ createdAt: -1 }).lean();
    return documents.map((doc) => ({
      id: String(doc._id),
      name: doc.name,
      price: doc.price,
      stock: doc.stock,
      category: doc.category,
      createdAt: doc.createdAt,
      updatedAt: doc.updatedAt,
    }));
  },
  create: async (payload: CreateProductInput): Promise<Product> => {
    const document = await ProductModel.create(payload);
    return {
      id: String(document._id),
      name: document.name,
      price: document.price,
      stock: document.stock,
      category: document.category,
      createdAt: document.createdAt,
      updatedAt: document.updatedAt,
    };
  },
};
