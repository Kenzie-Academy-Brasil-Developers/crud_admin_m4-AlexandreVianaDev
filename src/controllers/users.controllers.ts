import { Request, Response } from "express";
import createUserService from "../services/users/createUsers.service";
import { userRequestSchema } from "../schemas/user.schemas";
import { TUserRequest } from "../interfaces/users.interfaces";

export const createUserController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const userData: TUserRequest = req.body;
  const user = await createUserService(userData);
  return res.status(201).json(user);
};
