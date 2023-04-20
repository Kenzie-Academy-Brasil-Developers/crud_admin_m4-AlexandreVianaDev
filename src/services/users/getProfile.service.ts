import { TUserResponse, TUserResult } from "../../interfaces/users.interfaces";
import { client } from "../../database";
import { userResponseSchema } from "../../schemas/user.schemas";
import { QueryConfig } from "pg";

export const getProfileService = async (id: number): Promise<TUserResponse> => {
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

  const user: TUserResponse = userResponseSchema.parse(queryResult.rows[0]);

  return user;
};
