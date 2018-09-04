import {createSelector} from "reselect";
import {optionsSelector} from "./options-selector";

export const apiUrlSelector = createSelector(optionsSelector, opt => opt ? opt.apiUrl : undefined);