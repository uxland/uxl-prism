import {createSelector} from "reselect";
import {appSelector} from "../selector";

export const orientationSelector = createSelector(appSelector, app => app.orientation);