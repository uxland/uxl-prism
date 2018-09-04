import {createSelector} from "reselect";
import {appSelector} from "../selector";

export const geoLocationSelector = createSelector(appSelector, app => app ? app.geoLocation : undefined);
export const lastKnownPositionSelector = createSelector(geoLocationSelector, gl => gl ? gl.lastKnownPosition : undefined);
export const registeredWatchersSelector = createSelector(geoLocationSelector, gl => gl ? gl.registeredWatchers : undefined);
