import { randomUUID } from "node:crypto";

import { Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    _id: { type: String, default: randomUUID },
    name: { type: String, required: true, trim: true, minlength: 2, maxlength: 150 },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      unique: true,
      index: true,
      maxlength: 150,
    },
    phone: { type: String, trim: true, maxlength: 20, default: "" },
    password_hash: { type: String, required: true },
    role_id: { type: String, ref: "Role", required: true, index: true },
    is_blocked: { type: Boolean, default: false },
  },
  {
    versionKey: false,
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  },
);

export const UserModel = model("User", userSchema);
