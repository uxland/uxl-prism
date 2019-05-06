import {ModuleInfo} from "../../src";
import {setLocales} from "../../src/mixins";
import {locales} from "./locales";
import {calculateModuleBaseRoute} from "../../src";
import {regionManager} from '@uxland/uxl-regions';
export const initialize = (mi: ModuleInfo) =>{
    console.log('intializing module3');
    setLocales(locales);
    let basePath = calculateModuleBaseRoute(mi);
    regionManager.registerViewWithRegion('router', 'module3', {htmlTag: 'module3-page', htmlUrl: `${basePath}/page.js`, route: 'module3'});
    regionManager.registerViewWithRegion('nav', 'module3', {htmlTag: 'menu-item-3', htmlUrl: `${basePath}/menu-item.js`, route: 'module3', sortHint: '003'});
};

export const dispose = (mi: ModuleInfo) =>{

};