import {locale} from "../../src/mixins";
import {LitElement, customElement, html} from "lit-element";

@customElement('module2-page')
export class Page2 extends locale(LitElement){
    render(){
        return html`<h1>${this.localize('module2.page')}</h1>`
    }
}