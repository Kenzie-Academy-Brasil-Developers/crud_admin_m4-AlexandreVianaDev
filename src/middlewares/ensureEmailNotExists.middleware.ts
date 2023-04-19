import { NextFunction, Request, Response } from "express";
import { QueryConfig } from "pg";
import { client } from "../database";
import { TUserResponse, TUserResult } from "../interfaces/users.interfaces";

export const ensureEmailNotExists = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  const { email } = req.body;

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

  if (queryResult.rowCount !== 0) {
    return res.status(409).json({
      message: "E-mail already registered",
    });
  }

  return next();
};
