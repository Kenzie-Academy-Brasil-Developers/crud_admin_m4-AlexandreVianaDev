import { Request, Response, Router } from "express";
import {
  createUserController,
  deleteUserController,
  getProfileController,
  getUsersController,
  recoverUserController,
  updateUserController,
} from "../controllers/users.controllers";
import { ensureEmailNotExists } from "../middlewares/ensureEmailNotExists.middleware";
import { validateBody } from "../middlewares/validateBody.middleware";
import { userRequestSchema, userUpdateSchema } from "../schemas/user.schemas";
import { ensureTokenIsValid } from "../middlewares/ensureTokenIsValid.middleware";
import { ensureUserIsAdmin } from "../middlewares/ensureUserIsAdmin.middleware";
import { ensureIdExists } from "../middlewares/ensureIdExists.middleware";
import { ensureUserIsActive } from "../middlewares/ensureUserIsActive.middleware";

const userRoutes: Router = Router();

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

export default userRoutes;
