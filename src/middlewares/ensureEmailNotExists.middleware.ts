import { NextFunction, Request, Response } from "express";
import { QueryConfig } from "pg";
import { client } from "../database";
import { TUserResult } from "../interfaces/users.interfaces";
import { AppError } from "../error";

export const ensureEmailNotExists = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  const email: string = req.body.email;

  const queryString: string = `
    SELECT
      *
    FROM
      users
    WHERE
      "email" = $1;
  `;

  const queryConfig: QueryConfig = {
    text: queryString,
    values: [email],
  };

  const queryResult: TUserResult = await client.query(queryConfig);

  if (queryResult.rowCount !== 0) {
    throw new AppError("E-mail already registered", 409);
  }

  return next();
};
