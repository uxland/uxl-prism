import {Locale} from "../../src/mixins/localization";
import {customElement, LitElement, html} from "lit-element";

@customElement('module1-page')
export class Page1 extends Locale(LitElement){
    render(){
        return html`<h1>${this.localize('module1.page')}</h1>`
    }
}