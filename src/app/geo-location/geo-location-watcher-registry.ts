import createAction from "@uxland/uxl-redux/create-action";
import {REGISTER_GEO_LOCATION_WATCHER, UNREGISTER_GEO_LOCATION_WATCHER} from "./reducer";
import identity from 'lodash-es/identity';
import isEmpty from 'lodash-es/isEmpty';
import {store} from "../../store";
import {setLastPosition} from "./set-last-position";
import {registeredWatchersSelector} from "./selectors";
const registerWatcherActionCreator = createAction<string, string>(REGISTER_GEO_LOCATION_WATCHER, identity, identity);
const unregisterWatcherActionCreator = createAction<string, string>(UNREGISTER_GEO_LOCATION_WATCHER, x => undefined, identity);

export let watchId: number = undefined;
const options: PositionOptions = {
    enableHighAccuracy: true,
    maximumAge: 15 * 1000 //15 seconds
};

export const registerGeoLocationWatcher = (watcherId: string) =>{
    store.dispatch(registerWatcherActionCreator(watcherId));
    if(!watchId && navigator.geolocation && navigator.geolocation.watchPosition)
        watchId = navigator.geolocation.watchPosition(setLastPosition, null, options);
};
export const unregisterGeoLocationWatcher = (watcherId: string) => {
  store.dispatch(unregisterWatcherActionCreator(watcherId));
  if(watchId && isEmpty(registeredWatchersSelector(store.getState()))){
      navigator.geolocation.clearWatch(watchId);
      watchId = undefined;
  }
};