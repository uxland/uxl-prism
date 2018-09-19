import {customElement} from "@uxland/uxl-polymer2-ts";
import {Locale} from "../../src/mixins/localization";
import {LitElement, html} from "@polymer/lit-element";

@customElement('menu-item-1')
export class MenuItem1 extends Locale(LitElement){
    render(){
        return html `<a href='module1'>${this.localize('module1.menu-item')}</a>`
    }
}