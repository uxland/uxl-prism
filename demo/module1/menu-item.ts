import {locale} from "../../src/mixins";
import {customElement, LitElement, html} from "lit-element";

@customElement('menu-item-1')
export class MenuItem1 extends locale(LitElement){
    render(){
        return html `<a href='module1'>${this.localize('module1.menu-item')}</a>`
    }
}