import bcrypt from "bcryptjs";
import type { Document } from "mongoose";

import { HttpError } from "../../../utils/httpError";
import { roleRepository } from "../../role/repository/role.repository";
import { userRepository } from "../repository/user.repository";
import type { CreateUserInput } from "../validation/user.validation";

type PopulatedRole = {
  _id: string;
  role_name: string;
};

const toUserResponse = (user: {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  role_id: string | PopulatedRole | (Document<unknown> & PopulatedRole);
  is_blocked: boolean;
  created_at: Date;
  updated_at: Date;
}) => ({
  id: user._id,
  name: user.name,
  email: user.email,
  phone: user.phone ?? "",
  role_id:
    typeof user.role_id === "string"
      ? user.role_id
      : String((user.role_id as PopulatedRole & { _id: string })._id),
  role_name: typeof user.role_id === "string" ? undefined : (user.role_id as PopulatedRole).role_name,
  is_blocked: user.is_blocked,
  created_at: user.created_at,
  updated_at: user.updated_at,
});

export const userService = {
  createUser: async (payload: CreateUserInput) => {
    const existing = await userRepository.findByEmail(payload.email);
    if (existing) {
      throw new HttpError(409, "User with this email already exists");
    }

    const role = await roleRepository.findByName(payload.role_name);
    if (!role) {
      throw new HttpError(400, "Invalid role_name");
    }

    const passwordHash = await bcrypt.hash(payload.password, 12);
    const user = await userRepository.createUser({
      name: payload.name,
      email: payload.email,
      phone: payload.phone,
      role_id: String(role._id),
      password_hash: passwordHash,
    });

    return toUserResponse(user);
  },
  listUsers: async () => {
    const users = await userRepository.listUsers();
    return users.map(toUserResponse);
  },
  getUserById: async (id: string) => {
    const user = await userRepository.findById(id);
    if (!user) {
      throw new HttpError(404, "User not found");
    }
    return toUserResponse(user);
  },
};
