import type { Request, Response } from "express";

import { userService } from "../service/user.service";
import { createUserSchema } from "../validation/user.validation";

export const userController = {
  createUser: async (req: Request, res: Response) => {
    const payload = createUserSchema.parse(req.body);
    const data = await userService.createUser(payload);
    return res.status(201).json({ data });
  },
  listUsers: async (_req: Request, res: Response) => {
    const data = await userService.listUsers();
    return res.status(200).json({ data });
  },
  getMe: async (req: Request, res: Response) => {
    const data = await userService.getUserById(req.authUser!.id);
    return res.status(200).json({ data });
  },
};
