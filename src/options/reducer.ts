import {actionsBuilder} from "../constants";
import createBasicReducer from "@uxland/uxl-redux/create-basic-reducer";

export const SET_OPTIONS_ACTION = actionsBuilder('set-options');
export interface OptionsState{
    modulesBaseRootPath: string;
    appsBaseRoute?: string;
    apiUrl: string;
}
export const reducer = createBasicReducer<OptionsState>(SET_OPTIONS_ACTION, {defValue: null});