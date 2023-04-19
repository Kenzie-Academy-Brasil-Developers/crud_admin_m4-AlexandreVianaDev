import { QueryConfig } from "pg";
import {
  TToken,
  TUserCompleteResult,
  TUserRequest,
  TUserResponse,
  TUserResult,
  TUserUpdate,
} from "../../interfaces/users.interfaces";
import { client } from "../../database";
import { compare } from "bcryptjs";
import { AppError } from "../../error";
import { TUser, TUserLogin } from "../../__tests__/mocks/interfaces";
import { sign } from "jsonwebtoken";
import "dotenv/config";
import format from "pg-format";
import {
  userLoginSchema,
  userResponseSchema,
} from "../../schemas/user.schemas";

export const recoverUserService = async (
  newUserData: TUserUpdate,
  idParams: number,
  idToken: number,
  admin: boolean
): Promise<TUserResponse> => {
  if (!admin && idParams !== idToken) {
    throw new AppError("Insufficient Permission", 403);
  }

  const queryString: string = `
      UPDATE users
      SET 
        "active" = true
      WHERE
        id = $1
      RETURNING *;
    `;
  const queryConfig: QueryConfig = {
    text: queryString,
    values: [idParams],
  };

  const queryResult: TUserCompleteResult = await client.query(queryConfig);

  const user: TUserResponse = userResponseSchema.parse(queryResult.rows[0]);

  return user;
};
