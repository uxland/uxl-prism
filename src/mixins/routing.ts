import {routingMixin, RoutingMixinFunction} from '@uxland/uxl-routing/routing-mixin';
import {routingSelectors} from '@uxland/uxl-routing/selectors';
import {Redux} from "./redux";

export const Routing: RoutingMixinFunction = routingMixin(Redux, routingSelectors);
