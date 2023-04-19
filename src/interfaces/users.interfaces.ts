import { QueryResult } from "pg";
import { z } from "zod";
import {
  userRequestSchema,
  userResponseSchema,
  userSchema,
  userUpdateSchema,
} from "../schemas/user.schemas";

export type IUser = z.infer<typeof userSchema>;

export type TUserRequest = z.infer<typeof userRequestSchema>;

export type TUserResponse = z.infer<typeof userResponseSchema>;

export type TUserUpdate = z.infer<typeof userUpdateSchema>;

export type TUserResult = QueryResult<TUserResponse>;
