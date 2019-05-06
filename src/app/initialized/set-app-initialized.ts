import {Action, createAction} from "@uxland/uxl-redux";
import {SET_APP_INITIALIZED} from "./reducer";
import {store} from "../../store";

const setAppInitializedCreator = createAction<boolean>(SET_APP_INITIALIZED);
export const setAppInitialized: (initialized: boolean) => Action = (initialized: boolean) => store.dispatch(setAppInitializedCreator(initialized));