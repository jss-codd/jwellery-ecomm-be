import type { CreateProductInput } from "../validation/product.validation";
import { productRepository } from "../repository/product.repository";

export const productService = {
  getProducts: async () => productRepository.findAll(),
  createProduct: async (payload: CreateProductInput) => productRepository.create(payload),
};
