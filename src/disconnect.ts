import {eventsBuilder} from "./constants";
import {publish} from '@uxland/uxl-event-aggregator/event-aggregator';
import {resetReducers, DISCONNECT_ACTION, store} from "./store";
import {createAction} from "@uxland/uxl-redux";

const disconnectActionCreator = createAction(DISCONNECT_ACTION);

export const LOGOUT_EVENT = eventsBuilder('log-out');
export const disconnect = () =>{
    publish(LOGOUT_EVENT);
    resetReducers();
    store.dispatch(disconnectActionCreator());
};