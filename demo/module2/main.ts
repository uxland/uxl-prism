import {ModuleInfo} from "../../src";
import {setLocales} from "../../src/mixins/localization";
import {locales} from "./locales";
import {calculateModuleBaseRoute} from "../../src";
import {regionManager} from '@uxland/uxl-regions';
export const initialize = (mi: ModuleInfo) =>{
    console.log('intializing module2');
    setLocales(locales);
    let basePath = calculateModuleBaseRoute(mi);
    regionManager.registerViewWithRegion('router', 'module2', {htmlTag: 'module2-page', htmlUrl: `${basePath}/page.js`, route: 'module2'});
    regionManager.registerViewWithRegion('nav', 'module2', {htmlTag: 'menu-item-2', htmlUrl: `${basePath}/menu-item.js`, route: 'module2', sortHint: '002'});
};

export const dispose = (mi: ModuleInfo) =>{

};