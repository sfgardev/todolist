import { instance } from "./instance";
import { ResponseType } from "./types";

export const authAPI = {
  authMe() {
    return instance.get<ResponseType<UserModel>>("auth/me");
  },
  login(params: LoginRequestParams) {
    return instance.post<ResponseType<{ userId: number }>>(
      "auth/login",
      params
    );
  },
  logout() {
    return instance.delete<ResponseType>("auth/login");
  },
};

type UserModel = {
  id: number;
  email: string;
  login: string;
};

export type LoginRequestParams = {
  email: string;
  password: string;
  rememberMe?: boolean;
  captcha?: boolean;
};
