import {actionsBuilder} from "../../constants";
import createBasicReducer from "@uxland/uxl-redux/create-basic-reducer";
import {Reducer} from "redux";

export type ScreenOrientationType = 'landscape' | 'portrait'
export interface ScreenOrientationState{
    orientation: string;
    type: ScreenOrientationType;
}

export const SET_ORIENTATION_ACTION = actionsBuilder('set-orientation');
export const reducer: Reducer<ScreenOrientationState> = createBasicReducer<ScreenOrientationState>(SET_ORIENTATION_ACTION, {defValue: {type: null, orientation: ''}});