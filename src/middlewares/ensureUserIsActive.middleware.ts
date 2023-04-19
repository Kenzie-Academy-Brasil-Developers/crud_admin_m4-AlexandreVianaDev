import { NextFunction, Request, Response } from "express";
import { QueryConfig } from "pg";
import { client } from "../database";
import { TUserResult } from "../interfaces/users.interfaces";
import { AppError } from "../error";

export const ensureUserIsActive = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  if (req.method === "POST") {
    const { email } = req.body;
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

    const user = queryResult.rows[0];

    if (!user.active) {
      throw new AppError("Wrong email/password", 401);
    }
  }

  if (req.method === "PUT") {
    const { id } = req.params;
    const queryString: string = `
    SELECT
        *
    FROM
        users
    WHERE
        "id" = $1;
`;

    const queryConfig: QueryConfig = {
      text: queryString,
      values: [id],
    };

    const queryResult: TUserResult = await client.query(queryConfig);

    const user = queryResult.rows[0];

    if (user.active) {
      throw new AppError("User already active", 400);
    }
  }

  return next();
};
