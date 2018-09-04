import {PrismAppState} from "../store";

export const appSelector = (state: PrismAppState) => state ? state.app : undefined;