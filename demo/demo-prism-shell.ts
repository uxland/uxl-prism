import {PrismShellMixin} from "../src";
import '@polymer/iron-pages/iron-pages';
import {region, RegionHost} from "@uxland/uxl-regions";
import {routerRegion} from '@uxland/uxl-routed-region/router-region-decorator';
import {customElement, html, LitElement} from "lit-element";

@customElement('demo-prism-shell')
export class DemoPrismShell extends RegionHost(PrismShellMixin(LitElement)){
    render(){
        return html `
        <div id="nav"></div>
        <iron-pages id="routed-region"></iron-pages>`
    }
    @routerRegion({name: 'router', targetId: 'routed-region', route: ''})
    region: any;
    @region({name: 'nav', targetId: 'nav'})
    navRegion: any;
}