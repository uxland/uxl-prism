import {routingMixin} from 'uxl-routing/routing-mixin';
import {routingSelectors} from 'uxl-routing/selectors';
import {Redux} from "./redux";

export const Routing = routingMixin(Redux, routingSelectors);