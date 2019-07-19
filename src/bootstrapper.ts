import {fetchUserFunc, setUserLogin} from "./user/login";
import {fetchUser, setUserFetch} from "./user/fetch";
import {setFormats, setLanguage, setLocales} from "./mixins/localization";
import {bind} from "@uxland/uxl-redux/bind";
import {store} from "./store";
import {propertiesObserver} from '@uxland/uxl-utilities/properties-observer';
import {modulesSelector} from "./user/selectors";
import {ModuleInfo} from "./user/reducer";
import {setAppInitialized} from "./app/initialized/set-app-initialized";
import {init as initApp} from "./app/init";
import {setOptions} from "./options/set-options";
import {appInitializedSelector} from "./app/initialized/app-initialized-selector";
import {appsBaseRouteSelector} from "./options/apps-base-route-selector";
import {subscribe} from '@uxland/uxl-event-aggregator/event-aggregator';
import unary from 'ramda/es/unary';
import {LOGOUT_EVENT} from "./disconnect";
import {regionManager} from '@uxland/uxl-regions/region-manager';
import {router, init as initRouter} from "./router";
import {apiUrlSelector} from "./options/api-url-selector";
import {withBaseUrl} from "@uxland/uxl-fetch-client";
import {watch} from "@uxland/uxl-redux/watch";
import {Store, Unsubscribe} from "redux";
import {PropertyWatch} from "@uxland/uxl-redux";

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
    dispose(moduleInfo: ModuleInfo): Promise<any>;
}

export type ModulePostFn = <T = any>(mi: ModuleInfo) => (module: IModule) => Promise<T>;
//const main = "main.ts";
/*const moduleLoader =(postFn: modulePostFn, appsBaseRoute: string) => (moduleInfo: ModuleInfo) =>
    moduleInfo && moduleInfo.localModule
        ? import(/!* webpackChunkName: "localModule" *!/ `src/${main}`).then(postFn(moduleInfo))
        : import(/!* webpackChunkName: "[request]" *!/ `@uxland-admin/${
            moduleInfo.folder
            }/src/main.ts`).then(postFn(moduleInfo));*/

const moduleInitializer: ModulePostFn = mi => module => module.initialize(mi);
const moduleDisposer: ModulePostFn = mi => module => module.dispose(mi);

export abstract class Bootstrapper extends propertiesObserver(<any>Object) implements IBootstrapper{
    constructor(protected options: BootstrapOptions){
        super();
        bind(<any>this);
    }
    __reduxStoreSubscriptions__: Unsubscribe[];

    private static __uxlReduxWatchedProperties: { [key: string]: PropertyWatch };

    protected static get uxlReduxWatchedProperties(): { [key: string]: PropertyWatch } {
        if (!this.__uxlReduxWatchedProperties)
            this.__uxlReduxWatchedProperties = {};
        return this.__uxlReduxWatchedProperties;
    }

    public static watchProperty(name: PropertyKey, options: PropertyWatch) {
        this.uxlReduxWatchedProperties[String(name)] = options;
    }

    @watch(modulesSelector, {store})
    modules: ModuleInfo[];
    @watch(appInitializedSelector, {store})
    appInitialized: boolean;
    @watch(appsBaseRouteSelector, {store})
    appsBaseRoute: string;
    @watch(apiUrlSelector, {store})
    apiUrl: string;
    async run(): Promise<any> {
        setAppInitialized(false);
        withBaseUrl(this.options.apiUrl);
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
    private runModules(modules: ModuleInfo[] = [], postFn: ModulePostFn): Promise<any>{
        const loader = this.moduleLoader(postFn, this.appsBaseRoute);
        return Promise.all(modules.map(unary(loader)));
    }
    protected abstract moduleLoader(postFn: ModulePostFn, appsBaseRout: string): (moduleInfo: ModuleInfo) =>Promise<any>;

}

subscribe(LOGOUT_EVENT, () => {
    regionManager.clear();
    router.navigate(window.location.href).then();
});