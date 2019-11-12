import {loginUserAction} from './actions';
import {fetchClient} from '@uxland/uxl-fetch-client'
import {store} from "../store";
import {UserInfo, LOGIN_ACTIONS} from "./reducer";
import { createAction } from '@uxland/uxl-redux';

export type fetchUserFunc = <T extends UserInfo>(username: string, password: string) => Promise<T>;
const toAuthorizationHeader = (username: string, password) => ({headers: {Authorization: 'Basic ' + btoa(username + ':' + password)}})
export const setUserLogin = (fetch: string | fetchUserFunc) => {
    doLogin = typeof fetch === 'string' ? (uname, pswrd) => fetchClient.fetch(fetch, toAuthorizationHeader(uname, pswrd)) : fetch;
};

let doLogin:fetchUserFunc;

export const login = async(username: string, password: string) =>{
    let userInfo = await store.dispatch(loginUserAction((uname, pwd) => doLogin(uname, pwd))(username, password));
    return userInfo;
};
export const logout = () => store.dispatch(createAction(LOGIN_ACTIONS.invalidated)());