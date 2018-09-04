import {createSelector} from "reselect";
import {appSelector} from "../selector";

export const appInitializedSelector = createSelector(appSelector, app => app.initialized);