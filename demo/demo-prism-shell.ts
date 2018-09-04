import {PrismShellMixin} from "../src/prism-shell-mixin";
import {LitElement, html} from "@polymer/lit-element";
import '@polymer/iron-pages/iron-pages';
import {customElement} from "@uxland/uxl-polymer2-ts";
import {RegionHost} from "@uxland/uxl-regions/region-host-mixin";
import {region} from '@uxland/uxl-regions/region-decorator';
import '@polymer/iron-pages/iron-pages';
import {routerRegion} from '@uxland/uxl-routed-region/router-region-decorator';
@customElement('demo-prism-shell')
export class DemoPrismShell extends RegionHost(PrismShellMixin(LitElement)){
    _render(props: DemoPrismShell){
        return html `
        <div id="nav"></div>
        <iron-pages id="routed-region"></iron-pages>`
    }
    @routerRegion({name: 'router', targetId: 'routed-region', route: ''})
    region: any;
    @region({name: 'nav', targetId: 'nav'})
    navRegion: any;
}