import { UserModel } from "../user.model";

type CreateUserData = {
  name: string;
  email: string;
  phone?: string;
  password_hash: string;
  role_id: string;
};

export const userRepository = {
  findByEmail: async (email: string) =>
    UserModel.findOne({ email: email.toLowerCase() }).populate("role_id"),
  findById: async (id: string) => UserModel.findById(id).populate("role_id"),
  listUsers: async () => UserModel.find().sort({ created_at: -1 }).populate("role_id"),
  createUser: async (payload: CreateUserData) => UserModel.create(payload),
};
