import { TUserResponse, TUserResult } from "../../interfaces/users.interfaces";
import { client } from "../../database";
import { userListSchema, userResponseSchema } from "../../schemas/user.schemas";

export const getUsersService = async (): Promise<TUserResponse[]> => {
  const queryString: string = `
        SELECT 
            *
        FROM
            users;
    `;
  const queryResult: TUserResult = await client.query(queryString);

  const users: TUserResponse[] = userListSchema.parse(queryResult.rows);

  return users;
};
