import {locale} from "../../src/mixins";
import {LitElement, html, customElement} from "lit-element";

@customElement('menu-item-3')
export class MenuItem1 extends locale(LitElement){
    render(){
        return html `<a href='module3'>${this.localize('module3.menu-item')}</a>`
    }
}