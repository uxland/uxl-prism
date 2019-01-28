import {PrismShellMixin} from "../src/prism-shell-mixin";
import '@polymer/iron-pages/iron-pages';
import {RegionHost} from "@uxland/uxl-regions/region-host-mixin";
import {region} from '@uxland/uxl-regions/region-decorator';
import '@polymer/iron-pages/iron-pages';
import {routerRegion} from '@uxland/uxl-routed-region/router-region-decorator';
import {customElement, LitElement, html} from "lit-element";
// @ts-ignore
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