import { Request, Response } from "express";
import createUserService from "../services/users/createUsers.service";

export const createUserController = async (req: Request, res: Response): Promise<Response> => {
  //     const params = req.params
  //     const body = req.body
  //     const query = req.query
  //   const user = createUserService(params, body, query);

  const user = await createUserService();
  return res.status(201).json(user);
};
