import jwt from "jsonwebtoken";

import { env } from "../../../config/env";

type AuthUser = {
  _id: string;
  name: string;
  email: string;
  role_id: string | { _id: string; role_name: string };
};

export const authService = {
  createAuthPayload: (user: AuthUser) => {
    const roleId = typeof user.role_id === "string" ? user.role_id : String(user.role_id._id);
    const roleName = typeof user.role_id === "string" ? "staff" : user.role_id.role_name;

    const token = jwt.sign(
      { sub: String(user._id), role_id: roleId, role_name: roleName, email: user.email },
      env.JWT_SECRET,
      { expiresIn: env.JWT_EXPIRES_IN },
    );

    return {
      token,
      user: {
        id: String(user._id),
        name: user.name,
        email: user.email,
        role_id: roleId,
        role_name: roleName,
      },
    };
  },
};
