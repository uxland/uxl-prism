import {dedupingMixin} from "@polymer/polymer/lib/utils/mixin";
import {Routing} from "./mixins";
import {RoutingMixinConstructor} from "@uxland/uxl-routing";
import {MixinFunction} from "@uxland/uxl-utilities";

export type PrismShellMixinFunction = MixinFunction<RoutingMixinConstructor>;
export const PrismShellMixin: PrismShellMixinFunction = dedupingMixin(parent => {
   class mixin extends Routing(parent){
       subroute: string = '/';
   }

   return <any>mixin;
});
