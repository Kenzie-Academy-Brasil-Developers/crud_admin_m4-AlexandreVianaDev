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
  const email: string = res.locals.email;

  const queryString: string = `
        SELECT
            *
        FROM
            users
        WHERE
            email = $1;
    `;

  const queryConfig: QueryConfig = {
    text: queryString,
    values: [email],
  };

  const queryResult: TUserResult = await client.query(queryConfig);

  const user = queryResult.rows[0];

  if (req.method === "GET") {
    if (!user.admin) {
      throw new AppError("Insufficient Permission", 401);
    }
  }

  res.locals.admin = user.admin;

  return next();
};
