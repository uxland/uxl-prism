import {LitElement} from "lit-element";
import {BootstrapOptions} from "./bootstrapper";
import {Redux} from "./mixins/redux";
import {isLoggedInSelector} from "./user/selectors";
import {appInitializedSelector} from "./app/initialized/app-initialized-selector";
import {watch} from "@uxland/uxl-redux/watch";
export interface Settings {
    apiUrl: string;
    logoutUrl?: string;
    propagateCredentials?: boolean;
    autoLogin?: boolean;
    autoLoginUserName?: string;
    autoLoginPassword?: string;
    initialDelay?: number;
    appsBaseRoute?: string;
    offlineEnabled?: boolean;
}
export interface UxlPrism {
    settings: Settings;
}

declare interface Window {
    uxlPrism: UxlPrism;
}
declare var uxlPrism: UxlPrism;
export abstract class PrismAppBase extends Redux(LitElement){
    options: BootstrapOptions = {
        fetchUser: undefined,
        apiUrl: uxlPrism.settings.apiUrl,
        locales: {ca:{}},
        language: 'ca',
        appsBaseRoute: uxlPrism.settings.appsBaseRoute,
        moduleBaseRoute: '/'
    };
    connectedCallback(){
        super.connectedCallback();
        this.initApp();
    }
    protected abstract initApp();
    protected getPagePath(page: any): string {
        return null;
    }
     private _currentView: string;

    @watch(isLoggedInSelector)
    loggedIn: boolean;
    @watch(appInitializedSelector)
    initialized: boolean;
    protected get currentView(): string{
        let view = !this.initialized ? 'splash' : this.loggedIn ? 'shell' : 'login';
        if(view !== this._currentView)
            this._currentView = view;
        return view;
    }
}
