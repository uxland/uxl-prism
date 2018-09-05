import {routingMixin} from '@uxland/uxl-routing/routing-mixin';
import {routingSelectors} from '@uxland/uxl-routing/selectors';
import {Redux} from "./redux";

export const Routing = routingMixin(Redux, routingSelectors);