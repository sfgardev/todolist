import { BaseResponse } from "../../../common/types";
import { instance } from "./instance";

export const authAPI = {
  authMe() {
    return instance.get<BaseResponse<UserModel>>("auth/me");
  },
  login(params: LoginRequestParams) {
    return instance.post<BaseResponse<{ userId: number }>>(
      "auth/login",
      params
    );
  },
  logout() {
    return instance.delete<BaseResponse>("auth/login");
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
