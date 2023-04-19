import format from "pg-format";
import {
  TUserRequest,
  TUserResponse,
  TUserResult,
} from "../../interfaces/users.interfaces";
import { client } from "../../database";

import { userResponseSchema } from "../../schemas/user.schemas";
import { hash } from "bcryptjs";

export const createUserService = async (
  userData: TUserRequest
): Promise<TUserResponse> => {
  const hashedPassword = await hash(userData.password, 10);

  const newUserData = {
    ...userData,
    password: hashedPassword,
  };

  const queryString: string = format(
    `
      INSERT INTO users
        (%I)
      VALUES
        (%L)
      RETURNING *;
    `,
    Object.keys(newUserData),
    Object.values(newUserData)
  );

  const queryResult: TUserResult = await client.query(queryString);
  const userResponse = userResponseSchema.parse(queryResult.rows[0]);

  return userResponse;
};
