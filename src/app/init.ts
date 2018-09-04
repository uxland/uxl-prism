import {Dispatch} from "redux";
import {Action} from "@uxland/uxl-redux/create-action";
import {init as initOrientation} from './orientation/init';
import {init as initAppOnline} from './online/init';
const initMethods = [initAppOnline, initOrientation];
export const init = (dispatch: Dispatch<Action>) => initMethods.forEach(i => i(dispatch));