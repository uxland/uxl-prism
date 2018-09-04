import {customElement} from "@uxland/uxl-polymer2-ts";
import {Locale} from "../../src/mixins/localization";
import {LitElement, html} from "@polymer/lit-element";
import * as settings from '@polymer/polymer/lib/utils/settings';
@customElement('menu-item-2')
export class MenuItem1 extends Locale(LitElement){
    _render(){
        return html `<a href='module2'>${this.localize('module2.menu-item')}</a>`
    }
}