import {Locale} from "../../src/mixins/localization";
import {LitElement, html, customElement} from "lit-element";

@customElement('menu-item-3')
export class MenuItem1 extends Locale(LitElement){
    render(){
        return html `<a href='module3'>${this.localize('module3.menu-item')}</a>`
    }
}