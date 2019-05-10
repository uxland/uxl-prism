import {MainViewType, SET_VIEW_ACTION} from "./reducer";
import {store} from "../store";
import {createAction, Action} from "@uxland/uxl-redux";

const setViewActionCreator = createAction<MainViewType>(SET_VIEW_ACTION);
export const setView: (view: MainViewType) => Action<MainViewType> = (view: MainViewType) => store.dispatch(setViewActionCreator(view));