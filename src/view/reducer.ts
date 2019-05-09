import {actionsBuilder} from "../constants";
import {Reducer} from "redux";
import {createBasicReducer} from "@uxland/uxl-redux";

export type MainViewType = 'splash' | 'login' | 'shell';
export const SET_VIEW_ACTION = actionsBuilder('set-view-action');
export const reducer: Reducer<MainViewType> = createBasicReducer<MainViewType>(SET_VIEW_ACTION, {defValue: 'splash'});