import {actionsBuilder} from "../../constants";
import {Action} from "@uxland/uxl-redux";

export const SET_APP_ONLINE_ACTION = actionsBuilder('set-app-online');
export const SET_APP_OFFLINE_ACTION = actionsBuilder('set-app-offline');
export const reducer = (state: boolean = false, action: Action) =>
    action.type === SET_APP_OFFLINE_ACTION ? true : action.type === SET_APP_OFFLINE_ACTION ? false : state;