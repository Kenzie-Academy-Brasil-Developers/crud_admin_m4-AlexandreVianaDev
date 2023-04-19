import { Router } from "express";
import {
  createUserController,
  deleteUserController,
  getProfileController,
  getUsersController,
  recoverUserController,
  updateUserController,
} from "../controllers/users.controllers";
import {
  ensureEmailNotExists,
  validateBody,
  ensureTokenIsValid,
  ensureUserIsAdmin,
  ensureIdExists,
  ensureUserIsActive,
} from "../middlewares";
import { userRequestSchema, userUpdateSchema } from "../schemas/user.schemas";

export const userRoutes: Router = Router();

userRoutes.post(
  "",
  validateBody(userRequestSchema),
  ensureEmailNotExists,
  createUserController
);
userRoutes.get("", ensureTokenIsValid, ensureUserIsAdmin, getUsersController);
userRoutes.get("/profile", ensureTokenIsValid, getProfileController);
userRoutes.patch(
  "/:id",
  ensureTokenIsValid,
  ensureIdExists,
  validateBody(userUpdateSchema),
  ensureUserIsAdmin,
  ensureEmailNotExists,
  updateUserController
);
userRoutes.delete(
  "/:id",
  ensureTokenIsValid,
  ensureIdExists,
  ensureUserIsAdmin,
  deleteUserController
);
userRoutes.put(
  "/:id/recover",
  ensureTokenIsValid,
  ensureIdExists,
  ensureUserIsAdmin,
  ensureUserIsActive,
  recoverUserController
);

// export default userRoutes;
