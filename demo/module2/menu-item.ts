import {Locale} from "../../src/mixins/localization";
import {LitElement, customElement, html} from "lit-element";
@customElement('menu-item-2')
export class MenuItem2 extends Locale(LitElement){
    render(){
        return html `<a href='module2'>${this.localize('module2.menu-item')}</a>`
    }
}