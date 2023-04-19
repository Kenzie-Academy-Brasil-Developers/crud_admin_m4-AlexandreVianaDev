import { QueryConfig } from "pg";
import {
  TUserCompleteResult,
  TUserResponse,
  TUserUpdate,
} from "../../interfaces/users.interfaces";
import { client } from "../../database";
import "dotenv/config";
import format from "pg-format";
import {
  userResponseSchema,
  userUpdateSchema,
} from "../../schemas/user.schemas";

export const updateUserService = async (
  newUserData: TUserUpdate,
  idParams: number,
  idToken: number,
  admin: boolean
): Promise<TUserResponse> => {
  const newData: TUserUpdate = userUpdateSchema.parse(newUserData);

  const queryString: string = format(
    `
      UPDATE users
      SET 
        (%I) = ROW(%L)
      WHERE
        id = $1
      RETURNING *;
    `,
    Object.keys(newData),
    Object.values(newData)
  );
  const queryConfig: QueryConfig = {
    text: queryString,
    values: [idParams],
  };

  const queryResult: TUserCompleteResult = await client.query(queryConfig);

  const user: TUserResponse = userResponseSchema.parse(queryResult.rows[0]);

  return user;
};
