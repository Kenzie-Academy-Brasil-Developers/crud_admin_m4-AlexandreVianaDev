import { QueryConfig } from "pg";
import { client } from "../../database";
import { AppError } from "../../error";
import "dotenv/config";

export const deleteUserService = async (
  idParams: number,
  idToken: number,
  admin: boolean
): Promise<void> => {
  if (!admin && idParams !== idToken) {
    throw new AppError("Insufficient Permission", 403);
  }

  const queryString: string = `
      UPDATE
        users
      SET 
        "active" = false
      WHERE
        id = $1
      RETURNING *;
    `;
  const queryConfig: QueryConfig = {
    text: queryString,
    values: [idParams],
  };

  await client.query(queryConfig);
};
