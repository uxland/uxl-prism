import {actionsBuilder} from "../constants";
import {createBasicReducer} from "@uxland/uxl-redux";
import {Reducer} from "redux";

export const SET_OPTIONS_ACTION = actionsBuilder('set-options');
export interface OptionsState{
    modulesBaseRootPath: string;
    appsBaseRoute?: string;
    apiUrl: string;
}
export const reducer: Reducer<OptionsState> = createBasicReducer<OptionsState>(SET_OPTIONS_ACTION, {defValue: null});