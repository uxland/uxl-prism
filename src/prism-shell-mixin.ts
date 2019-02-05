import {dedupingMixin} from "@polymer/polymer/lib/utils/mixin";
import {Routing} from "./mixins/routing";
import {RoutingMixinConstructor} from "@uxland/uxl-routing/routing-mixin";
import {MixinFunction} from "@uxland/uxl-utilities/types";

export type PrismShellMixinFunction = MixinFunction<RoutingMixinConstructor>;
export const PrismShellMixin: PrismShellMixinFunction = dedupingMixin(parent => {
   class mixin extends Routing(parent){
       subroute: string = '/';
   }

   return <any>mixin;
});
