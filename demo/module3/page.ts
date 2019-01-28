import {Locale} from "../../src/mixins/localization";
import {LitElement, html, customElement} from "lit-element";

@customElement('module3-page')
export class Page3 extends Locale(LitElement){
    render(){
        return html`<h1>${this.localize('module3.page')}</h1>`
    }
}