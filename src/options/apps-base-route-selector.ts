import {createSelector} from "reselect";
import {optionsSelector} from "./options-selector";

export const appsBaseRouteSelector = createSelector(optionsSelector, opt => opt ? opt.appsBaseRoute : undefined);