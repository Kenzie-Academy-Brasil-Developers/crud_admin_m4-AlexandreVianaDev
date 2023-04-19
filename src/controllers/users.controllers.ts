import { Request, Response } from "express";
import createUserService from "../services/users/createUsers.service";
import { userRequestSchema } from "../schemas/user.schemas";
import { TUserRequest, TUserUpdate } from "../interfaces/users.interfaces";
import { loginUserService } from "../services/users/loginUsers.service";
import getUsersService from "../services/users/getUsers.service";
import { getProfileService } from "../services/users/getProfile.service";
import { updateUserService } from "../services/users/updateUser.service";
import { deleteUserService } from "../services/users/deleteUser.service";
import { recoverUserService } from "../services/users/recoverUser.service";

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
  const userData: TUserRequest = req.body;
  const user = await loginUserService(userData);
  return res.status(200).json(user);
};

export const getUsersController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const user = await getUsersService();
  return res.status(200).json(user);
};

export const getProfileController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const email = res.locals.email;
  const profile = await getProfileService(email);
  return res.status(200).json(profile);
};

export const updateUserController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const newUserData: TUserUpdate = req.body;
  const idParams: number = parseInt(req.params.id);
  const idToken: number = parseInt(res.locals.id);
  const admin: boolean = res.locals.admin;
  const user = await updateUserService(newUserData, idParams, idToken, admin);
  return res.status(200).json(user);
};

export const deleteUserController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const newUserData: TUserUpdate = req.body;
  const idParams: number = parseInt(req.params.id);
  const idToken: number = parseInt(res.locals.id);
  const admin: boolean = res.locals.admin;
  const user = await deleteUserService(newUserData, idParams, idToken, admin);
  return res.status(204).send();
};

export const recoverUserController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const newUserData: TUserUpdate = req.body;
  const idParams: number = parseInt(req.params.id);
  const idToken: number = parseInt(res.locals.id);
  const admin: boolean = res.locals.admin;
  const user = await recoverUserService(newUserData, idParams, idToken, admin);
  return res.status(200).json(user);
};
