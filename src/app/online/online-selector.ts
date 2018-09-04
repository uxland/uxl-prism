import {createSelector} from "reselect";
import {appSelector} from "../selector";

export const onlineSelector = createSelector(appSelector, app => app.online);