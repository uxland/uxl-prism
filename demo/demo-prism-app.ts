import {PrismAppBase} from "../src/prism-app-base";
import {fetchUserFunc} from "../src/user/login";
import {UserInfo} from "../src";
import {customElement} from "@uxland/uxl-polymer2-ts";
import {html} from '@polymer/lit-element/lit-element';
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
            url: 'http://127.0.0.1:8081/demo/module3/main.js'
        }
    ]
};
const fetchUser = (uname, pwd) => uname && pwd ? Promise.resolve(user) : Promise.reject('invalid credentials');
const paths = {login: './demo-login.js', shell: './demo-prism-shell.js'}
@customElement('demo-prism-app')
export class DemoPrismApp extends PrismAppBase{
    constructor() {
        super();
        this.options = {...this.options, fetchUser: <fetchUserFunc>fetchUser}
    }
    getPagePath(view: string){
        return paths[view];
    }
    _render(){
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