import {applyMiddleware, combineReducers, createStore, Reducer, Store} from "redux";
import thunk from 'redux-thunk';
import {LocalizationState, reducer as localization} from '@uxland/uxl-localization';
import {reducer as routing, RoutingState} from '@uxland/uxl-routing';
import {reducer as user, UserState} from './user/reducer';
import {MainViewType, reducer as view} from './view/reducer';
import {ApplicationState, reducer as app} from "./app/reducer";
import {OptionsState, reducer as options} from './options/reducer';
import {Action} from "@uxland/uxl-redux";
import {actionsBuilder} from "./constants";

export interface PrismAppState {
    app: ApplicationState;
    user: UserState<any>;
    localization: LocalizationState;
    routing: RoutingState;
    view: MainViewType;
    options: OptionsState;
}

export type ReducerDictionary = { [key: string]: Reducer };
let reducers: ReducerDictionary = {};
export const DISCONNECT_ACTION = actionsBuilder('disconnect');
const createReducer = (reducers: ReducerDictionary = {}) => {
    let mainReducer = combineReducers({...{localization, routing, user, view, app, options}, ...reducers});
    return (state: PrismAppState, action: Action) =>
        mainReducer(action.type === DISCONNECT_ACTION ? <any>{
            app: state.app,
            localization: state.localization,
            options: state.options
        } : state, action);

};

export const store: Store<PrismAppState> = createStore(createReducer(), applyMiddleware(thunk));
export const disconnect = () => {
    store.replaceReducer(createReducer());
    store.dispatch({type: DISCONNECT_ACTION});
};
export const injectReducer = (name: string, reducer: Reducer<any, any>) => {
    reducers[name] = reducer;
    store.replaceReducer(createReducer(reducers));
};
export const resetReducers = () => {
    reducers = {};
    store.replaceReducer(createReducer());
};