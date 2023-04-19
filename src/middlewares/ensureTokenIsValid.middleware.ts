import { NextFunction, Request, Response } from "express";

import { verify } from "jsonwebtoken";
import { AppError } from "../error";

export const ensureTokenIsValid = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  const tokenFromReq: string | undefined = req.headers["authorization"];

  if (!tokenFromReq) {
    throw new AppError("Missing Bearer Token", 401);
  }

  const token: string = tokenFromReq.split(" ")[1];

  verify(token, String(process.env.SECRET_KEY), (error: any, decoded: any) => {
    if (error) {
      throw new AppError(error.message, 401);
    }
    console.log("DECODED", decoded);
    res.locals.id = parseInt(decoded.sub);
    res.locals.email = decoded.email;
    res.locals.admin = decoded.admin;
  });

  return next();
};
