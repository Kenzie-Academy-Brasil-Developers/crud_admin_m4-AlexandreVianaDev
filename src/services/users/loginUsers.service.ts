import { QueryConfig } from "pg";
import {
  TToken,
  TUserCompleteResult,
  TUserRequest,
  TUserResponse,
  TUserResult,
} from "../../interfaces/users.interfaces";
import { client } from "../../database";
import { compare } from "bcryptjs";
import { AppError } from "../../error";
import { TUser } from "../../__tests__/mocks/interfaces";
import { sign } from "jsonwebtoken";
import "dotenv/config";

export const loginUserService = async (
  userData: TUserRequest
): Promise<TToken> => {
  const { email } = userData;
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

  const queryResult: TUserCompleteResult = await client.query(queryConfig);

  const user = queryResult.rows[0];

  const passwordMatch: boolean = await compare(
    userData.password,
    user.password
  );

  if (!passwordMatch) {
    throw new AppError("Wrong email/password", 401);
  }

  const token: string = sign(
    { email: user.email },
    String(process.env.SECRET_KEY),
    { expiresIn: String(process.env.EXPIRES_IN), subject: String(user.id) }
  );

  return { token };
};
