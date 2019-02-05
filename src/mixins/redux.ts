import {connect, ConnectMixinFunction} from '@uxland/uxl-redux/connect'
import {store} from "../store";

export const Redux: ConnectMixinFunction = connect(store);  //: <T>(p: any) => IReduxMixin<T> = (p: any) => reduxMixin(store)(p);
