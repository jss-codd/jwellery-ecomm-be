import type { NextFunction, Request, Response } from "express";
import { passport } from "../config/passport";

import { HttpError } from "../utils/httpError";

export const authMiddleware = (req: Request, _res: Response, next: NextFunction) => {
  return passport.authenticate("jwt", { session: false }, (err: unknown, user: Request["user"]) => {
    if (err || !user) {
      return next(new HttpError(401, "Invalid or expired token"));
    }
    req.user = user;
    req.authUser = {
      id: String(user._id),
      role_id: String(typeof user.role_id === "string" ? user.role_id : user.role_id._id),
      role_name: typeof user.role_id === "string" ? "staff" : user.role_id.role_name,
      email: user.email,
    };
    return next();
  })(req, _res, next);
};

export const requireRole =
  (roles: string[]) => (req: Request, _res: Response, next: NextFunction) => {
    if (!req.authUser || !roles.includes(req.authUser.role_name)) {
      return next(new HttpError(403, "Forbidden"));
    }
    return next();
  };
