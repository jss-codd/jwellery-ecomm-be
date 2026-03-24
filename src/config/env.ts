import dotenv from "dotenv";
import { z } from "zod";

dotenv.config();

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  PORT: z.coerce.number().default(5000),
  API_PREFIX: z.string().default("/api/v1"),
  APP_BASE_URL: z.string().url().default("http://localhost:5000"),
  ADMIN_APP_URL: z.string().url().default("http://localhost:3000"),
  DATABASE_URL: z.string().min(1, "DATABASE_URL is required"),
  JWT_SECRET: z.string().min(8, "JWT_SECRET must be at least 8 chars"),
  JWT_EXPIRES_IN: z.string().default("7d"),
  ADMIN_SEED_NAME: z.string().default("Admin User"),
  ADMIN_SEED_EMAIL: z.string().email().default("admin@jewellery.local"),
  ADMIN_SEED_PASSWORD: z.string().min(8).default("Admin@12345"),
  LOG_LEVEL: z.enum(["fatal", "error", "warn", "info", "debug", "trace"]).default("info"),
  LOG_DIR: z.string().default("logs"),
});

export const env = envSchema.parse(process.env);
