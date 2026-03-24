import { Router } from "express";

import { asyncHandler } from "../../utils/asyncHandler";
import { authMiddleware, requireRole } from "../../middleware/auth.middleware";
import { userController } from "./controller/user.controller";

export const userRoutes = Router();

userRoutes.post("/", asyncHandler(userController.createUser));
userRoutes.get("/", authMiddleware, requireRole(["admin"]), asyncHandler(userController.listUsers));
userRoutes.get("/me", authMiddleware, asyncHandler(userController.getMe));
