import {AsyncState, Action} from '@uxland/uxl-redux';
import {createAsyncActions} from "@uxland/uxl-redux/create-async-actions";
import {actionsBuilder} from '../constants';
export interface ModuleInfo{
    folder?: string;
    moduleId: string;
    sortHint?: string;
    url?: string;
    options?: any;
    localModule?: boolean;
}

export interface UserInfo{
    modules: ModuleInfo[];
}

export interface UserState<T extends UserInfo> extends AsyncState<T>{
    isLoggedIn: boolean;
}
export const FETCH_USER_ACTION = actionsBuilder('fetch-user');
export const LOGIN_USER_ACTION = actionsBuilder('login-user');
const FETCH_ACTIONS = createAsyncActions(FETCH_USER_ACTION);
const LOGIN_ACTIONS = createAsyncActions(LOGIN_USER_ACTION);
const getLoginActionMessage = (error: any) =>{
    return error.status == 401 ? error.statusText || 'login.credentials.invalid' : '';
};
const defaultUserState: UserState<any> = {isLoggedIn: false, didInvalidate: false, error: false, elapsed: null, errorDescription: '', exceptions: null, isFetching: false, state: null, timestamp: null};
export const reducer: (state: UserState<any>, action: Action) => UserState<any> = (state = defaultUserState, action) =>{
    switch (action.type) {
        case FETCH_ACTIONS.started:
        case LOGIN_ACTIONS.started:
            return {...defaultUserState, isFetching: true};
        case FETCH_ACTIONS.failed:
            return {...defaultUserState};
        case LOGIN_ACTIONS.failed:
            return {...defaultUserState, error: true, errorDescription: getLoginActionMessage(action.payload), exceptions: [...action.payload]};
        case LOGIN_ACTIONS.succeeded:
        case FETCH_ACTIONS.succeeded:
            return {...defaultUserState, state: action.payload, isLoggedIn: true};
        case FETCH_ACTIONS.ended:
        case LOGIN_ACTIONS.ended:
            return {...state, elapsed: action.elapsed};
        default:
            return state;
    }
};