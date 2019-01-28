import {Locale} from "../../src/mixins/localization";
import {customElement, LitElement, html} from "lit-element";

@customElement('menu-item-1')
export class MenuItem1 extends Locale(LitElement){
    render(){
        return html `<a href='module1'>${this.localize('module1.menu-item')}</a>`
    }
}