import {locale} from "../../src/mixins";
import {LitElement, html, customElement} from "lit-element";

@customElement('module3-page')
export class Page3 extends locale(LitElement){
    render(){
        return html`<h1>${this.localize('module3.page')}</h1>`
    }
}