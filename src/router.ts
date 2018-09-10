import {Router} from "@uxland/uxl-routing/router";
import {Store} from "redux";
import {regionAdapterRegistry} from "@uxland/uxl-regions/region-adapter-registry";
import {routingAdapterFactoryFactory} from "@uxland/uxl-routed-region/routing-adapter-factory-factory";
import {initializeLinkClickSupport} from "@uxland/uxl-routing/link-click-support";
import {PrismAppState, store} from "./store";
export let router: Router;
export const init: (store: Store<PrismAppState>) => void = (store: Store<PrismAppState>) =>{
    router = new Router(store.dispatch, window.location.href);
    regionAdapterRegistry.registerAdapterFactory('iron-pages', routingAdapterFactoryFactory(router, store));
    initializeLinkClickSupport(router);
};