import {customElement} from "@uxland/uxl-polymer2-ts";
import {Locale} from "../../src/mixins/localization";
import {LitElement, html} from "@polymer/lit-element";

@customElement('menu-item-3')
export class MenuItem1 extends Locale(LitElement){
    _render(){
        return html `<a href='module3'>${this.localize('module3.menu-item')}</a>`
    }
}