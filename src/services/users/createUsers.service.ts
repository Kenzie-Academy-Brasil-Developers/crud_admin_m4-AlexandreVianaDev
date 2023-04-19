import format from "pg-format";
import {
  IUser,
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

const createUserService = async (
  userData: TUserRequest
): Promise<TUserResponse> => {
  const queryString: string = format(
    `
        INSERT INTO users
          (%I)
        VALUES
          (%L)
        RETURNING *;
      `,
    Object.keys(userData),
    Object.values(userData)
  );

  const queryResult: TUserResult = await client.query(queryString);
  const userResponse = userResponseSchema.parse(queryResult.rows[0]);

  return userResponse;
};

export default createUserService;
