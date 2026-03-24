import { randomUUID } from "node:crypto";

import { Schema, model } from "mongoose";

const roleSchema = new Schema(
  {
    _id: { type: String, default: randomUUID },
    role_name: { type: String, required: true, trim: true, unique: true, maxlength: 50 },
  },
  {
    versionKey: false,
    timestamps: { createdAt: "created_at", updatedAt: false },
  },
);

export const RoleModel = model("Role", roleSchema);
