import { Router } from "express";

import { env } from "../config/env";
import { authRoutes } from "../modules/auth/auth.routes";
import { productRoutes } from "../modules/product/product.routes";
import { userRoutes } from "../modules/user/user.routes";

export const apiRouter = Router();

/**
 * @openapi
 * /health:
 *   get:
 *     tags:
 *       - Health
 *     summary: Service health status
 *     responses:
 *       200:
 *         description: Service is healthy
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 docsUrl:
 *                   type: string
 */
apiRouter.get("/health", (_req, res) => {
  res.status(200).json({
    message: "Backend is healthy",
    docsUrl: `${env.APP_BASE_URL}/docs`,
  });
});

apiRouter.use("/products", productRoutes);
apiRouter.use("/users", userRoutes);
apiRouter.use("/auth", authRoutes);
