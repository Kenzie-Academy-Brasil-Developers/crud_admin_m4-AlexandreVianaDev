import { Request, Response, Router } from "express";
import { createUserController } from "../controllers/users.controllers";
import { ensureEmailNotExists } from "../middlewares/ensureEmailNotExists.middleware";
import { validateBody } from "../middlewares/validateBody.middleware";
import { userRequestSchema } from "../schemas/user.schemas";

const userRoutes: Router = Router();

userRoutes.post(
  "",
  validateBody(userRequestSchema),
  ensureEmailNotExists,
  createUserController
);
// userRoutes.get("")
// userRoutes.get("/profile")
// userRoutes.patch("/:id")
// userRoutes.delete("/:id")
// userRoutes.put("/:id/recover")

export default userRoutes;
