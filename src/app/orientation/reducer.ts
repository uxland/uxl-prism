import {actionsBuilder} from "../../constants";
import createBasicReducer from "@uxland/uxl-redux/create-basic-reducer";

export type ScreenOrientationType = 'landscape' | 'portrait'
export interface ScreenOrientationState{
    orientation: string;
    type: ScreenOrientationType;
}

export const SET_ORIENTATION_ACTION = actionsBuilder('set-orientation');
export const reducer = createBasicReducer<ScreenOrientationState>(SET_ORIENTATION_ACTION, {defValue: {type: null, orientation: ''}});