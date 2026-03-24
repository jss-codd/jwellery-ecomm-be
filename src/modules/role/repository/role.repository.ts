import { RoleModel } from "../role.model";

export const roleRepository = {
  findByName: async (roleName: string) => RoleModel.findOne({ role_name: roleName }),
  createRole: async (roleName: string) => RoleModel.create({ role_name: roleName }),
};
