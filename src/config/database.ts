import mongoose from "mongoose";

import { env } from "./env";
import { logger } from "./logger";

export const connectDatabase = async () => {
  await mongoose.connect(env.DATABASE_URL);
  logger.info("MongoDB connected successfully");
};

export const disconnectDatabase = async () => {
  await mongoose.disconnect();
  logger.info("MongoDB disconnected");
};
