import {ModuleInfo} from "./user/reducer";
import {appsBaseRouteSelector} from "./options/apps-base-route-selector";
import {store} from "./store";
import * as settings from '@polymer/polymer/lib/utils/settings';
export const calculateModuleBaseRoute: (moduleInfo: ModuleInfo) => string = moduleInfo => moduleInfo.url ?
    moduleInfo.url.substring(0, moduleInfo.url.indexOf('/main.js')) : `${settings['rootPath']}${appsBaseRouteSelector(store.getState())}${moduleInfo.folder}`;