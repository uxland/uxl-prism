import {Locale} from "../../src/mixins/localization";
import {LitElement, html} from "@polymer/lit-element";
import {customElement} from "@uxland/uxl-polymer2-ts";

@customElement('module1-page')
export class Page1 extends Locale(LitElement){
    _render(){
        return html`<h1>${this.localize('module1.page')}</h1>`
    }
}