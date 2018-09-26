import {Router} from "@uxland/uxl-routing/router";
import {Store} from "redux";
import {initializeLinkClickSupport} from "@uxland/uxl-routing/link-click-support";
import {PrismAppState, store} from "./store";
export let router: Router;
export const init: (store: Store<PrismAppState>) => void = (store: Store<PrismAppState>) =>{
    router = new Router(store.dispatch, window.location.href);
    initializeLinkClickSupport(router);
};