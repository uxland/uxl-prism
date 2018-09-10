import {actionsBuilder} from "../../constants";
import createBasicReducer from "@uxland/uxl-redux/create-basic-reducer";
import {Reducer} from "redux";

export const SET_APP_INITIALIZED = actionsBuilder('set-app-initialized');
export const reducer: Reducer<boolean> = createBasicReducer<boolean>(SET_APP_INITIALIZED, {defValue: false});
