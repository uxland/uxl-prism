import {IRoutingMixin, routingMixin} from '@uxland/uxl-routing/routing-mixin';
import {routingSelectors} from '@uxland/uxl-routing/selectors';
import {Redux} from "./redux";


export const Routing: <T = any>(p: any) => IRoutingMixin<T> = (p) => <any>routingMixin(Redux, routingSelectors)(p);