import { fetchClient } from "@uxland/uxl-fetch-client";
import { store } from "../store";
import { loginUserAction } from "./actions";
import { LoginInfo, UserInfo } from "./reducer";

export type fetchLoginFunc = <T extends LoginInfo>(
  username: string,
  password: string,
  center?: string
) => Promise<T>;
export type fetchUserFunc = <T extends UserInfo>(
  username: string,
  password: string,
  center?: string
) => Promise<T>;
const toAuthorizationHeader = (username: string, password) => ({
  headers: { Authorization: "Basic " + btoa(username + ":" + password) },
});
export const setUserLogin = (fetch: string | fetchUserFunc) => {
  doLogin =
    typeof fetch === "string"
      ? (uname, pswrd) =>
          fetchClient.fetch(fetch, toAuthorizationHeader(uname, pswrd))
      : fetch;
};

let doLogin: fetchUserFunc;

export const login = async (
  username: string,
  password: string,
  center?: string
) => {
  let userInfo = await store.dispatch(
    loginUserAction((uname, pwd, center) => doLogin(uname, pwd, center))(
      username,
      password,
      center
    )
  );
  return userInfo;
};
