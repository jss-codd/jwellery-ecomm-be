import { Router } from "express";
import { passport } from "../../config/passport";

import { asyncHandler } from "../../utils/asyncHandler";
import { authController } from "./controller/auth.controller";

export const authRoutes = Router();

authRoutes.post("/login", passport.authenticate("local", { session: false }), asyncHandler(authController.login));
authRoutes.post("/logout", asyncHandler(authController.logout));
