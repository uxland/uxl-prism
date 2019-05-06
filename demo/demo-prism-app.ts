import {PrismAppBase} from "../src";
import {fetchUserFunc} from "../src/user";
import {html, customElement} from 'lit-element';
import {Bootstrapper, ModulePostFn} from "../src";
import './demo-login';
import './demo-prism-shell';
import {ModuleInfo} from "../src";
import {regionAdapterRegistry} from "@uxland/uxl-regions";
import {routingAdapterFactoryFactory} from "@uxland/uxl-routed-region/routing-adapter-factory-factory";
import {router} from "../src";
import {store} from "../src";
const user = {
    modules: [
        {
            moduleId: 'module1',
            folder: 'module1'
        },
        {
            moduleId: 'module2',
            folder: 'module2'
        },
        {
            moduleId: 'module3',
            folder: 'module3'
        }
    ]
};
const fetchUser = (uname, pwd) => uname && pwd ? Promise.resolve(user) : Promise.reject('invalid credentials');
const main = "main.ts";
/*const moduleLoader =(postFn: ModulePostFn, appsBaseRoute: string) => (moduleInfo: ModuleInfo) =>
    moduleInfo && moduleInfo.localModule
        // @ts-ignore
        ? import(/!* webpackChunkName: "localModule" *!/ `src/${main}`).then(postFn(moduleInfo))
        // @ts-ignore
        : import(/!* webpackChunkName: "[request]" *!/ `@uxland-admin/${
            moduleInfo.folder
            }/src/main.ts`).then(postFn(moduleInfo));*/
const moduleLoader =(postFn: ModulePostFn, appsBaseRoute: string) => (moduleInfo: ModuleInfo) =>
    import(moduleInfo.url ? moduleInfo.url : `./${moduleInfo.folder}/main.js`).then(postFn(moduleInfo));


class DemoBootstrapper extends Bootstrapper{
    protected moduleLoader(postFn: ModulePostFn, appsBaseRout: string): (moduleInfo: ModuleInfo) => Promise<any> {
       return moduleLoader(postFn, this.appsBaseRoute);
    }

}
@customElement('demo-prism-app')
export class DemoPrismApp extends PrismAppBase{
    constructor() {
        super();
        this.options = {...this.options, fetchUser: <fetchUserFunc>fetchUser}
    }
    protected initApp() {
        return new DemoBootstrapper(this.options).run().then(() => regionAdapterRegistry.registerAdapterFactory('iron-pages', routingAdapterFactoryFactory(router, store)));
    }

    render(){
        switch (this.currentView) {
            case 'login':
                return html `<demo-login></demo-login>`;
            case 'shell':
                return html `<demo-prism-shell></demo-prism-shell>`;
            default:
                return html `<span>Loading...</span>`;
        }
    }
}