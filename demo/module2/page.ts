import {Locale} from "../../src/mixins/localization";
import {LitElement, html} from "@polymer/lit-element";
import {customElement} from "@uxland/uxl-polymer2-ts";

@customElement('module2-page')
export class Page2 extends Locale(LitElement){
    render(){
        return html`<h1>${this.localize('module2.page')}</h1>`
    }
}