import { TUserResponse, TUserResult } from "../../interfaces/users.interfaces";
import { client } from "../../database";
import { userResponseSchema } from "../../schemas/user.schemas";

export const getUsersService = async (): Promise<TUserResponse[]> => {
  const queryString: string = `
        SELECT 
            *
        FROM
            users;
    `;
  const queryResult: TUserResult = await client.query(queryString);

  const users: TUserResponse[] = queryResult.rows.map((user) => {
    return userResponseSchema.parse(user);
  });

  return users;
};