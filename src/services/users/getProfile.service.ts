import format from "pg-format";
import {
  TUserRequest,
  TUserResponse,
  TUserResult,
} from "../../interfaces/users.interfaces";
import { client } from "../../database";
import { TUserCreate } from "../../__tests__/mocks/interfaces";
import {
  userRequestSchema,
  userResponseSchema,
  userSchema,
} from "../../schemas/user.schemas";
import { hash } from "bcryptjs";
import { QueryConfig } from "pg";

export const getProfileService = async (
  id: number
): Promise<TUserResponse> => {
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

  console.log("USER", queryResult.rows[0]);
  const user: TUserResponse = userResponseSchema.parse(queryResult.rows[0]);

  return user;
};
