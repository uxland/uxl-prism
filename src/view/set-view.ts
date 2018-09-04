import createAction from "@uxland/uxl-redux/create-action";
import {MainViewType, SET_VIEW_ACTION} from "./reducer";
import {store} from "../store";

const setViewActionCreator = createAction<MainViewType>(SET_VIEW_ACTION);
export const setView = (view: MainViewType) => store.dispatch(setViewActionCreator(view));