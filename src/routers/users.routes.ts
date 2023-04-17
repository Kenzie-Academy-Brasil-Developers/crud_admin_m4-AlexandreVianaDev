import { Request, Response, Router } from "express";
import { createUserController } from "../controllers/users.controllers";
import { ensureEmailNotExists } from "../middlewares/ensureEmailNotExists.middleware";

const userRoutes: Router = Router()

userRoutes.post("", ensureEmailNotExists, createUserController)

export default userRoutes