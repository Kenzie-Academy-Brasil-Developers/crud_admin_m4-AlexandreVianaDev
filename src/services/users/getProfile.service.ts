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
  email: string
): Promise<TUserResponse> => {
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

  return queryResult.rows[0];
};
