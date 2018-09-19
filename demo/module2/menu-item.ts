import {customElement} from "@uxland/uxl-polymer2-ts";
import {Locale} from "../../src/mixins/localization";
import {LitElement, html} from "@polymer/lit-element";
@customElement('menu-item-2')
export class MenuItem2 extends Locale(LitElement){
    render(){
        return html `<a href='module2'>${this.localize('module2.menu-item')}</a>`
    }
}