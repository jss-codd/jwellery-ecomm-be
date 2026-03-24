import type { Request, Response } from "express";

import { authService } from "../service/auth.service";
import { HttpError } from "../../../utils/httpError";
import { env } from "../../../config/env";

export const authController = {
  login: async (req: Request, res: Response) => {
    if (!req.user) {
      throw new HttpError(401, "Invalid email or password");
    }
    const data = await authService.createAuthPayload(req.user);
    res.cookie("admin_token", data.token, {
      httpOnly: true,
      secure: env.NODE_ENV === "production",
      sameSite: env.NODE_ENV === "production" ? "none" : "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
      path: "/",
    });
    return res.status(200).json({ data });
  },
  logout: async (_req: Request, res: Response) => {
    res.clearCookie("admin_token", {
      httpOnly: true,
      secure: env.NODE_ENV === "production",
      sameSite: env.NODE_ENV === "production" ? "none" : "lax",
      path: "/",
    });
    return res.status(200).json({ message: "Logged out" });
  },
};
