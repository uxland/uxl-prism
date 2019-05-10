import {locale} from "../../src/mixins";
import {customElement, LitElement, html} from "lit-element";

@customElement('module1-page')
export class Page1 extends locale(LitElement){
    render(){
        return html`<h1>${this.localize('module1.page')}</h1>`
    }
}