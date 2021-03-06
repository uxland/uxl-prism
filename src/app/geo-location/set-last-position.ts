import {Action, createAction} from "@uxland/uxl-redux";
import {SET_LAST_POSITION_ACTION} from "./reducer";
import {store} from "../../store";

const setLastPositionActionCreator = createAction<Position>(SET_LAST_POSITION_ACTION);
export const setLastPosition: (position: Position) => Action<Position> = (position: Position) => store.dispatch(setLastPositionActionCreator(position));
