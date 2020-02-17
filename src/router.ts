import {initializeLinkClickSupport, Router} from "@uxland/uxl-routing";
import {Store} from "redux";
import {PrismAppState} from "./store";
import { store } from './store';
import { regionAdapterRegistry } from '@uxland/uxl-regions';
import { routingAdapterFactory } from '@uxland/uxl-routed-region';

export let router: Router = new Router(store.dispatch, window.location.origin);
export const init: (store: Store<PrismAppState>) => void = (store: Store<PrismAppState>) =>{
    initializeLinkClickSupport(router);
};

regionAdapterRegistry.registerDynamicAdapterFactory(routingAdapterFactory(router, store));
