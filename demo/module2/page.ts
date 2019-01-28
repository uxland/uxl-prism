import {Locale} from "../../src/mixins/localization";
import {LitElement, customElement, html} from "lit-element";

@customElement('module2-page')
export class Page2 extends Locale(LitElement){
    render(){
        return html`<h1>${this.localize('module2.page')}</h1>`
    }
}