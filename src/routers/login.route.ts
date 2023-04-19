import { Router } from "express";
import { validateBody } from "../middlewares/validateBody.middleware";
import { userLoginSchema } from "../schemas/user.schemas";
import { ensureEmailExists } from "../middlewares/ensureEmailExists.middleware";
import { loginUserController } from "../controllers/users.controllers";
import { ensureUserIsActive } from "../middlewares/ensureUserIsActive.middleware";

const loginRoute: Router = Router();

loginRoute.post(
  "",
  validateBody(userLoginSchema),
  ensureEmailExists,
  ensureUserIsActive,
  loginUserController
);

export default loginRoute;
