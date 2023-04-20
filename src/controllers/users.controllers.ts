import { Request, Response } from "express";
import {
  TUserRequest,
  TUserResponse,
  TUserUpdate,
} from "../interfaces/users.interfaces";
import {
  createUserService,
  loginUserService,
  getUsersService,
  getProfileService,
  updateUserService,
  deleteUserService,
  recoverUserService,
} from "../services/users";

export const createUserController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const userData: TUserRequest = req.body;
  const user = await createUserService(userData);
  return res.status(201).json(user);
};

export const loginUserController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const loginData: TUserRequest = req.body;
  const token = await loginUserService(loginData);
  return res.status(200).json(token);
};

export const getUsersController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const users: TUserResponse[] = await getUsersService();
  return res.status(200).json(users);
};

export const getProfileController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const id: number = res.locals.id;
  const profile = await getProfileService(id);
  return res.status(200).json(profile);
};

export const updateUserController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const newDataUser: TUserUpdate = req.body;
  const idParams: number = parseInt(req.params.id);
  const updatedUser = await updateUserService(newDataUser, idParams);
  return res.status(200).json(updatedUser);
};

export const deleteUserController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const idParams: number = parseInt(req.params.id);
  const idToken: number = res.locals.id;
  const admin: boolean = res.locals.admin;
  await deleteUserService(idParams, idToken, admin);
  return res.status(204).send();
};

export const recoverUserController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const idParams: number = parseInt(req.params.id);
  const user = await recoverUserService(idParams);
  return res.status(200).json(user);
};
