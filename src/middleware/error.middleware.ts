import type { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";

import { logger } from "../config/logger";
import { HttpError } from "../utils/httpError";

export const errorMiddleware = (
  err: unknown,
  req: Request,
  res: Response,
  _next: NextFunction,
) => {
  logger.error("Request failed", {
    requestId: req.requestId,
    path: req.originalUrl,
    method: req.method,
    error: err,
  });

  if (err instanceof ZodError) {
    return res.status(400).json({
      message: "Validation failed",
      issues: err.flatten(),
      requestId: req.requestId,
    });
  }

  if (err instanceof HttpError) {
    return res.status(err.statusCode).json({
      message: err.message,
      requestId: req.requestId,
    });
  }

  return res.status(500).json({
    message: "Internal server error",
    requestId: req.requestId,
  });
};
