import bcrypt from "bcryptjs";

import { connectDatabase, disconnectDatabase } from "../config/database";
import { env } from "../config/env";
import { logger } from "../config/logger";
import { roleRepository } from "../modules/role/repository/role.repository";
import { userRepository } from "../modules/user/repository/user.repository";

const seedAdmin = async () => {
  await connectDatabase();

  const adminRole = (await roleRepository.findByName("admin")) ?? (await roleRepository.createRole("admin"));
  await roleRepository.findByName("staff").then(async (role) => {
    if (!role) {
      await roleRepository.createRole("staff");
    }
  });

  const existing = await userRepository.findByEmail(env.ADMIN_SEED_EMAIL);
  if (existing) {
    logger.info("Admin seed already exists", { email: env.ADMIN_SEED_EMAIL });
    await disconnectDatabase();
    process.exit(0);
  }

  const passwordHash = await bcrypt.hash(env.ADMIN_SEED_PASSWORD, 12);

  await userRepository.createUser({
    name: env.ADMIN_SEED_NAME,
    email: env.ADMIN_SEED_EMAIL,
    password_hash: passwordHash,
    role_id: String(adminRole._id),
  });

  logger.info("Admin user seeded successfully", { email: env.ADMIN_SEED_EMAIL });
  await disconnectDatabase();
};

void seedAdmin().catch(async (error) => {
  logger.error("Failed to seed admin user", error);
  await disconnectDatabase();
  process.exit(1);
});
