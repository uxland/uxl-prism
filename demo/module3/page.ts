import {Locale} from "../../src/mixins/localization";
import {LitElement, html} from "@polymer/lit-element";
import {customElement} from "@uxland/uxl-polymer2-ts";

@customElement('module3-page')
export class Page3 extends Locale(LitElement){
    _render(){
        return html`<h1>${this.localize('module3.page')}</h1>`
    }
}