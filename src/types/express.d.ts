import "express-serve-static-core";
import "express";
import "cookie-parser";

declare global {
  namespace Express {
    interface User {
      _id: string;
      name: string;
      email: string;
      role_id: string | { _id: string; role_name: string };
      is_blocked: boolean;
    }
  }
}

declare module "express-serve-static-core" {
  interface Request {
    requestId?: string;
    authUser?: {
      id: string;
      role_id: string;
      role_name: string;
      email: string;
    };
  }
}
