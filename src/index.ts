declare interface Settings {
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
declare interface UxlPrism {
    settings: Settings;
}

declare interface Window {
    uxlPrism: UxlPrism;
}
declare var uxlPrism: UxlPrism;

export {UserState, UserInfo, ModuleInfo} from './user/reducer';
