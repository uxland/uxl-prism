import {dedupingMixin} from "@polymer/polymer/lib/utils/mixin";
import {Routing} from "./mixins/routing";
import {IRoutingMixin} from "uxl-routing/routing-mixin";
import {LitElement} from "@polymer/lit-element";

export const PrismShellMixin = dedupingMixin(parent => {
   class mixin extends Routing(parent){
       subroute: string = '/';
   }

   return (<any>mixin) as IRoutingMixin & LitElement;
});