import {createSelector} from "reselect";
import {optionsSelector} from "./options-selector";

export const modulesBaseRootPathSelector = createSelector(optionsSelector, opt => opt ? opt.modulesBaseRootPath : undefined);