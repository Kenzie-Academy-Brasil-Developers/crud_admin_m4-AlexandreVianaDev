export interface IUser {
  id: number;
  name: string;
  email: string;
  password: string;
  admin: boolean;
  active: boolean;
}

export type TUserRequest = Omit<IUser, "id">;

export type TUserResponse = Omit<IUser, "password">;
