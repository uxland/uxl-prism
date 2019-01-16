import {fetchUserFunc, setUserLogin} from "./user/login";
import {fetchUser, setUserFetch} from "./user/fetch";
import {setFormats, setLanguage, setLocales} from "./mixins/localization";
import {bind} from "@uxland/uxl-redux/redux-binding";
import {collect} from '@uxland/uxl-utilities/collect';
import {store} from "./store";
import {propertiesObserver} from '@uxland/uxl-utilities/properties-observer';
import {modulesSelector} from "./user/selectors";
import {ModuleInfo} from "./user/reducer";
import {property} from '@uxland/uxl-polymer2-ts';
import {setAppInitialized} from "./app/initialized/set-app-initialized";
import {init as initApp} from "./app/init";
import {setOptions} from "./options/set-options";
import {appInitializedSelector} from "./app/initialized/app-initialized-selector";
import {importHref} from '@uxland/uxl-utilities/import-href';
import {appsBaseRouteSelector} from "./options/apps-base-route-selector";
import {subscribe} from '@uxland/uxl-event-aggregator/event-aggregator';
import curryRight from "lodash-es/curryRight";
import unary from 'lodash-es/unary';
import {LOGOUT_EVENT} from "./disconnect";
import {regionManager} from '@uxland/uxl-regions/region-manager';
import {router, init as initRouter} from "./router";
import * as polymerSettings from "@polymer/polymer/lib/utils/settings";
import {apiUrlSelector} from "./options/api-url-selector";
import {withBaseUrl} from "@uxland/uxl-fetch-client";

export interface IBootstrapper {
    run(): Promise<any>;
}
export interface BootstrapOptions{
    language: string;
    locales?: any;
    fetchUser: string | fetchUserFunc;
    initialRoute?: string;
    moduleBaseRoute?: string;
    apiUrl?: string;
    appsBaseRoute?: string;
}
const initializeLocalization = (language: string, locales: Object, formats?: any) =>{
    if(language)
        setLanguage(language);
    if(locales)
        setLocales(locales);
    if(formats)
        setFormats(formats);
};
export interface IModule{
    initialize(moduleInfo: ModuleInfo): Promise<any>;
    dispose(moduleIndo: ModuleInfo): Promise<any>;
}

type modulePostFn = <T = any>(mi: ModuleInfo, module: IModule) => Promise<T>;

const moduleLoader = (module: ModuleInfo, appsBaseRoute: string, postFn : modulePostFn) => import(`@uxland-admin/${module.folder}/main.js` ).then(m => postFn(module, m));
    // importHref(module.url || `${polymerSettings['rootPath']}${appsBaseRoute}${module.folder}/main.js`).then(m => postFn(module, m));

const moduleInitializer: modulePostFn = (mi, module) => module.initialize(mi);
const moduleDisposer: modulePostFn = (mi, module) => module.dispose(mi);

class Bootstrapper extends propertiesObserver(Object) implements IBootstrapper{
    constructor(protected options: BootstrapOptions){
        super();
        bind(this, collect(this.constructor, 'properties'), store);
    }

    @property({statePath: modulesSelector})
    modules: ModuleInfo[];
    @property({statePath: appInitializedSelector})
    appInitialized: boolean;
    @property({statePath: appsBaseRouteSelector})
    appsBaseRoute: string;
    @property({statePath: apiUrlSelector})
    apiUrl: string;
    async run(): Promise<any> {
        setAppInitialized(false);
        setOptions({appsBaseRoute: this.options.appsBaseRoute, modulesBaseRootPath: this.options.moduleBaseRoute, apiUrl: this.options.apiUrl});
        initializeLocalization(this.options.language, this.options.locales);
        initApp(store.dispatch);
        await this.initializeUser();
        await this.handleModulesChanged(this.modules);
        initRouter(store);
        setAppInitialized(true);
        await router.navigate(window.location.href);
    }

    modulesChanged(modules: ModuleInfo[], old: ModuleInfo[]){
        if(this.appInitialized)
            this.handleModulesChanged(modules, old);
    }
    apiUrlChanged(apiUrl: string){
        withBaseUrl(apiUrl);
    }
    private async initializeUser(){
        setUserLogin(this.options.fetchUser);
        setUserFetch(this.options.fetchUser);
        try {
            await fetchUser();
        }
        catch (e) {

        }
    }
    private async handleModulesChanged(modules: ModuleInfo[], oldModules?: ModuleInfo[]){
        await this.runModules(oldModules, moduleDisposer);
        await this.runModules(modules, moduleInitializer);
    }
    private runModules(modules: ModuleInfo[] = [], postFn: modulePostFn): Promise<any>{
        const loader = curryRight(moduleLoader)(postFn)(this.appsBaseRoute);
        return Promise.all(modules.map(unary(loader)));
    }

}
const createBootstrapper = (options: BootstrapOptions) =>{
    return new Bootstrapper(options);
};
export const bootstrap = (options: BootstrapOptions): Promise<any> =>{
    return createBootstrapper(options).run();
};
subscribe(LOGOUT_EVENT, () => {
    regionManager.clear();
    router.navigate(window.location.href);
});
