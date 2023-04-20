import { QueryConfig } from "pg";
import {
  TUserCompleteResult,
  TUserResponse,
} from "../../interfaces/users.interfaces";
import { client } from "../../database";
import "dotenv/config";
import { userResponseSchema } from "../../schemas/user.schemas";

export const recoverUserService = async (
  idParams: number
): Promise<TUserResponse> => {
  const queryString: string = `
    UPDATE
      users
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
