import {IReduxMixin, reduxMixin} from '@uxland/uxl-redux/redux-mixin'
import {store} from "../store";

export const Redux: <T>() => (p: any) => IReduxMixin<T> = () => reduxMixin(store);
