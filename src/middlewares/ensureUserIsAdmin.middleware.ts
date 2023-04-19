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
  if (req.method === "POST") {
    const email: string = res.locals.email;
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

    res.locals.admin = user.admin;
  } else {
    const id: number = res.locals.id;

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
    if (!user.admin && req.method !== "PATCH" && req.method !== "DELETE") {
      throw new AppError("Insufficient Permission", 403);
    }

    if (req.method === "PATCH") {
      const idParams: number = parseInt(req.params.id);
      if (!user.admin && idParams !== id) {
        throw new AppError("Insufficient Permission", 403);
      }

      return next();
    }

    res.locals.admin = user.admin;
  }

  return next();
};
