import {PrismAppState} from "../store";
import {createSelector} from "reselect";
import {UserState, ModuleInfo} from "./reducer";

const userSelector: (state: PrismAppState) => UserState<any> = state => state.user;
export const userInfoSelector: (state: PrismAppState) => any = createSelector(userSelector, u => u.state);
export const userIsFetchingSelector: (state: PrismAppState) => boolean = createSelector(userSelector, u => u.isFetching);
export const userErrorSelector: (state: PrismAppState) => boolean =  createSelector(userSelector, u => u.error);
export const userErrorDescriptionSelector: (state: PrismAppState) => string =  createSelector(userSelector, u => u.errorDescription);
export const isLoggedInSelector: (state: PrismAppState) => boolean =  createSelector(userSelector, u => u.isLoggedIn);
export const modulesSelector: (state: PrismAppState) => ModuleInfo[] = createSelector(userInfoSelector, ui => ui ? ui.modules : undefined);