import {ModuleInfo} from "../../src";
import {setLocales} from "../../src/mixins/localization";
import {locales} from "./locales";
import {calculateModuleBaseRoute} from "../../src/calculate-module-base-route";
import {regionManager} from '@uxland/uxl-regions';
export const initialize = (mi: ModuleInfo) =>{
    console.log('intializing module1');
    setLocales(locales);
    let basePath = calculateModuleBaseRoute(mi);
    regionManager.registerViewWithRegion('router', 'module1', {htmlTag: 'module1-page', htmlUrl: `${basePath}/page.js`, route: 'module1'});
    regionManager.registerViewWithRegion('nav', 'module1', {htmlTag: 'menu-item-1', htmlUrl: `${basePath}/menu-item.js`, route: 'module1', sortHint: '001'});
};

export const dispose = (mi: ModuleInfo) =>{

};