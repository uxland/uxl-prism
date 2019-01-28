import {LitElement} from "lit-element";
import {bootstrap, BootstrapOptions} from "./bootstrapper";
import {Redux} from "./mixins/redux";
import {resolveUrl} from "@polymer/polymer/lib/utils/resolve-url";
import {importHref} from '@uxland/uxl-utilities/import-href';
import {isLoggedInSelector} from "./user/selectors";
import {appInitializedSelector} from "./app/initialized/app-initialized-selector";
import {IReduxMixin} from "@uxland/uxl-redux/redux-mixin";
import {statePath} from "@uxland/uxl-redux/state-path";
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
export abstract class PrismAppBase extends Redux(LitElement) implements IReduxMixin<any>{
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
    protected initApp(){
        bootstrap(this.options);
    }
    protected getPagePath(page: any): string {
        return null;
    }
     private _currentView: string;

    @statePath(isLoggedInSelector)
    loggedIn: boolean;
    @statePath(appInitializedSelector)
    initialized: boolean;
    protected get currentView(): string{
        let view = !this.initialized ? 'splash' : this.loggedIn ? 'shell' : 'login';
        if(view !== this._currentView){
            this._currentView = view;
            if(view){
                let path = this.getPagePath(view);
                if(path)
                    importHref(resolveUrl(path));
            }
        }
        return view;
    }
}
