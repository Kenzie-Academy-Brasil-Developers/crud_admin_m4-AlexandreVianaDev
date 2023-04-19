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

const getUsersService = async (): Promise<TUserResponse[]> => {
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

export default getUsersService;
