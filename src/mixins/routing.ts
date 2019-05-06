import {routingMixin, RoutingMixinFunction} from '@uxland/uxl-routing';
import {routingSelectors} from '@uxland/uxl-routing';
import {Redux} from "./redux";

export const Routing: RoutingMixinFunction = routingMixin(Redux, routingSelectors);
