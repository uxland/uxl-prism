import {actionsBuilder} from "../../constants";
import createBasicReducer from "@uxland/uxl-redux/create-basic-reducer";

export const SET_APP_INITIALIZED = actionsBuilder('set-app-initialized');
export const reducer = createBasicReducer<boolean>(SET_APP_INITIALIZED, {defValue: false});
