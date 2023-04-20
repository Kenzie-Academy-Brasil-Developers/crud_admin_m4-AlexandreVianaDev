import { NextFunction, Request, Response } from "express";
import { QueryConfig } from "pg";
import { client } from "../database";
import { TUserResult } from "../interfaces/users.interfaces";
import { AppError } from "../error";

export const ensureUserIsAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  const admin: boolean = res.locals.admin;
  const id: number = res.locals.id;

  if (!admin) {
    if (req.method === "GET" || req.method === "PUT") {
      throw new AppError("Insufficient Permission", 403);
    }

    if (req.method === "PATCH") {
      const idParams: number = parseInt(req.params.id);
      if (idParams !== id) {
        throw new AppError("Insufficient Permission", 403);
      }

      return next();
    }
  }

  return next();
};
