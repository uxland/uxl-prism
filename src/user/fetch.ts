import {store} from '../store';
import {fetchUserAction} from './actions';
import {fetchUserFunc} from "./login";
import {fetchClient} from "@uxland/uxl-fetch-client";

export const setUserFetch = (fetch: string | fetchUserFunc) =>{
    doFetch = typeof fetch === 'string' ? () => fetchClient.fetch(fetch) : fetch;

};
let doFetch: fetchUserFunc;
export const fetchUser = async () =>{
    return await store.dispatch(fetchUserAction(() => doFetch(undefined, undefined))());
};