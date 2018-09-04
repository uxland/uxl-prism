import {PrismAppState} from "../store";

export const optionsSelector = (state: PrismAppState) => state ? state.options : undefined;