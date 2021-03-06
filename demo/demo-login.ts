import {locale} from "../src/mixins";
import {login} from "../src/user";
import {customElement, property, LitElement, html} from "lit-element";
import {listen} from '@uxland/uxl-utilities';
@customElement('demo-login')
export class DemoLogin extends locale(LitElement){
    render(){
        return <any> html `<div>
            <input type="text" value="${this.username}" class="input-el" prop-name="username">
            <input type="text" value="${this.password}" class="input-el" prop-name="password">
            <input type="button" id="submit" value="${this.localize('login.submit-label')}">
</div>`;
    }
    @property()
    username: string;
    @property()
    password: string;
    @listen('change', '.input-el')
    onInput(e: Event){
        let target = e.currentTarget as HTMLInputElement;
        let propName = target.attributes['prop-name'].value;
        if(propName)
            this[propName] = target.value;
    }
    @listen(`click`, `#submit`)
    onSubmit(){
        console.log('submit');
        if(this.username && this.password)
            login(this.username, this.password);
    }
}