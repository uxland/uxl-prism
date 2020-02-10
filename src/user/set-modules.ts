import { store } from '../store';
import { setModulesAction } from './actions';
import { Action } from '@uxland/uxl-redux';
import { ModuleInfo } from './reducer';
export const setModules: (modules: ModuleInfo[]) => Action = (modules: ModuleInfo[]) => store.dispatch(setModulesAction(modules));
