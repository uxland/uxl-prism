import {Action, createAction} from "@uxland/uxl-redux";
import {OptionsState, SET_OPTIONS_ACTION} from "./reducer";
import {store} from "../store";

const setOptionsCreator = createAction<OptionsState>(SET_OPTIONS_ACTION);
export const setOptions: (options: OptionsState) => Action<OptionsState> = (options: OptionsState) => store.dispatch(setOptionsCreator(options));