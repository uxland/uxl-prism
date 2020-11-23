import { Routing } from "./mixins";
import { RoutingMixinConstructor } from "@uxland/uxl-routing";
import { MixinFunction } from "@uxland/uxl-utilities";
import { dedupingMixin } from "./polymer/deduping-mixin";

export type PrismShellMixinFunction = MixinFunction<RoutingMixinConstructor>;
export const PrismShellMixin: PrismShellMixinFunction = dedupingMixin(
  (parent) => {
    class mixin extends Routing(parent) {
      subroute: string = "/";
    }

    return <any>mixin;
  }
);
