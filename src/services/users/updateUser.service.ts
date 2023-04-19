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

export const updateUserService = async (
  newUserData: TUserUpdate,
  idParams: number,
  idToken: number,
  admin: boolean
): Promise<TUserResponse> => {
  console.log("admin", admin, "idParams", idParams, "idToken", idToken);
  if (!admin && idParams !== idToken) {
    throw new AppError("Insufficient Permission", 403);
  }

  const queryString: string = format(
    `
      UPDATE users
      SET 
        (%I) = ROW(%L)
      WHERE
        id = $1
      RETURNING *;
    `,
    Object.keys(newUserData),
    Object.values(newUserData)
  );
  const queryConfig: QueryConfig = {
    text: queryString,
    values: [idParams],
  };

  const queryResult: TUserCompleteResult = await client.query(queryConfig);

  const user: TUserResponse = userResponseSchema.parse(queryResult.rows[0]);

  return user;
};
