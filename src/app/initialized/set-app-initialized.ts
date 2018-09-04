import createAction from "@uxland/uxl-redux/create-action";
import {SET_APP_INITIALIZED} from "./reducer";
import {store} from "../../store";

const setAppInitializedCreator = createAction<boolean>(SET_APP_INITIALIZED);
export const setAppInitialized = (initialized: boolean) => store.dispatch(setAppInitializedCreator(initialized));