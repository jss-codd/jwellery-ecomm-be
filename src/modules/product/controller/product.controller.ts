import type { Request, Response } from "express";

import { productService } from "../service/product.service";
import { createProductSchema } from "../validation/product.validation";

export const productController = {
  getProducts: async (_req: Request, res: Response) => {
    const data = await productService.getProducts();
    return res.status(200).json({ data });
  },
  createProduct: async (req: Request, res: Response) => {
    const payload = createProductSchema.parse(req.body);
    const data = await productService.createProduct(payload);
    return res.status(201).json({ data });
  },
};
