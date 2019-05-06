import {locale} from "../../src/mixins";
import {LitElement, customElement, html} from "lit-element";
@customElement('menu-item-2')
export class MenuItem2 extends locale(LitElement){
    render(){
        return html `<a href='module2'>${this.localize('module2.menu-item')}</a>`
    }
}