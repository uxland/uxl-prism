import {routingMixin, RoutingMixinFunction} from '@uxland/uxl-routing';
import {routingSelectors} from '@uxland/uxl-routing';
import { store } from "../store";

export const Routing: RoutingMixinFunction = routingMixin(store, routingSelectors);
