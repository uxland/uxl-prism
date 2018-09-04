import {Locale} from "../src/mixins/localization";
import {LitElement, html} from "@polymer/lit-element";
import {customElement, listen, property} from "@uxland/uxl-polymer2-ts";
import {login} from "../src/user/login";
@customElement('demo-login')
export class DemoLogin extends Locale(LitElement){
    _render(props: DemoLogin){
        return html `<div>
            <input type="text" value="${props.username}" class="input-el" prop-name="username">
            <input type="text" value="${props.password}" class="input-el" prop-name="password">
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
    onSubmit(e){
        console.log('submit');
        if(this.username && this.password)
            login(this.username, this.password);
    }
}