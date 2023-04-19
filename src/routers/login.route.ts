import { Router } from "express";
import { userLoginSchema } from "../schemas/user.schemas";
import {
  validateBody,
  ensureEmailExists,
  ensureUserIsActive,
} from "../middlewares";
import { loginUserController } from "../controllers/users.controllers";

export const loginRoute: Router = Router();

loginRoute.post(
  "",
  validateBody(userLoginSchema),
  ensureEmailExists,
  ensureUserIsActive,
  loginUserController
);
