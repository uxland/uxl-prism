import {describe, it} from 'mocha';
import {
    GeoLocationState,
    reducer,
    REGISTER_GEO_LOCATION_WATCHER,
    SET_LAST_POSITION_ACTION, UNREGISTER_GEO_LOCATION_WATCHER
} from "../../../../src/app/geo-location/reducer";
import {expect} from 'chai';
const position: Position = {
    timestamp: Date.now(),
    coords: {
        speed: 120,
        heading: null,
        altitudeAccuracy: 2.0,
        accuracy: 2.0,
        altitude: 130,
        latitude: 45.23,
        longitude: 38.43
    }
};

describe('app geo location reducer', () =>  {
    describe('When invoking reducer method', () =>{
        describe('and action type is not related to geo location', () =>{
            describe('and state is undefined', () =>{
                it('should return default state', () =>{
                    const defaultState: GeoLocationState = {registeredWatchers: {}, lastKnownPosition: null};
                    let nextState = reducer(undefined, {type: '@@ANY'});
                    expect(nextState).to.be.eql(defaultState);
                })
            });
            describe('and state is defined', () =>{
                it('should return state supplied', () =>{
                    let state: GeoLocationState = {registeredWatchers: {watcher1: 'watcher1'}, lastKnownPosition: position};
                    let nextState = reducer(state, {type:'@@ANY'});
                    expect(nextState).to.be.equal(state);
                })
            });

        });
        describe('and action is set last position', () =>{
            it('should return a new state with lastKnown updated', () =>{
                let state: GeoLocationState = {registeredWatchers: {watcher1: 'watcher1'}, lastKnownPosition: position};
                let newPosition: Position = {timestamp: Date.now(), coords:{longitude: 1, latitude: 1, altitude: 1, accuracy: 1, altitudeAccuracy: 1, heading: 1, speed: 1}};
                let newState = reducer(state, {type: SET_LAST_POSITION_ACTION, payload: newPosition});
                expect(newState).not.to.be.equal(state);
                expect(newState.lastKnownPosition).to.be.equal(newPosition);
            });
            it('should return same registered watcher', () =>{
                let state: GeoLocationState = {registeredWatchers: {watcher1: 'watcher1'}, lastKnownPosition: position};
                let newPosition: Position = {timestamp: Date.now(), coords:{longitude: 1, latitude: 1, altitude: 1, accuracy: 1, altitudeAccuracy: 1, heading: 1, speed: 1}};
                let newState = reducer(state, {type: SET_LAST_POSITION_ACTION, payload: newPosition});
                expect(newState.registeredWatchers).to.be.equal(state.registeredWatchers);
            })
        });
        describe('and action is register watcher', () =>{
            it('should return a new state with the new watcher registered', () =>{
                let state: GeoLocationState = {registeredWatchers: {watcher1: 'watcher1'}, lastKnownPosition: position};
                let newState = reducer(state, {type: REGISTER_GEO_LOCATION_WATCHER, payload: 'watcher2', meta: 'watcher2'});
                expect(newState).to.not.be.equal(state);
                expect(newState.registeredWatchers).to.be.eql({watcher1: 'watcher1', watcher2: 'watcher2'});
                let newState2 = reducer(state, {type: REGISTER_GEO_LOCATION_WATCHER, payload: 'myWatcher', meta: 'watcher3'});
                expect(newState2.registeredWatchers).to.be.eql({watcher1: 'watcher1', watcher3: 'myWatcher'});
            });
            it('should return same position', () =>{
                let state: GeoLocationState = {registeredWatchers: {watcher1: 'watcher1'}, lastKnownPosition: position};
                let newState = reducer(state, {type: REGISTER_GEO_LOCATION_WATCHER, payload: 'watcher2', meta: 'watcher2'});
                expect(newState.lastKnownPosition).to.be.equal(state.lastKnownPosition);
            });
            describe('and watcher already exists', () =>{
                it('should replace watcher with the new one', () =>{
                    let state: GeoLocationState = {registeredWatchers: {watcher1: 'watcher1'}, lastKnownPosition: position};
                    let newState = reducer(state, {type: REGISTER_GEO_LOCATION_WATCHER, payload: 'myNewWatcher', meta: 'watcher1'});
                    expect(newState.registeredWatchers.watcher1).to.be.equal('myNewWatcher');
                })
            })

        });
        describe('and action is unregister watcher', () =>{
            it('should return a new state without the watcher supplied in action meta property', () =>{
                let state: GeoLocationState = {registeredWatchers: {watcher1: 'watcher1'}, lastKnownPosition: position};
                let newState = reducer(state, {type: UNREGISTER_GEO_LOCATION_WATCHER, meta: 'watcher1'});
                expect(Object.getOwnPropertyDescriptor(newState, 'watcher1')).to.not.exist;
                expect(newState).to.not.be.equal(state);
            });
            it('should return same input state if watcher does not exist', () =>{
                let state: GeoLocationState = {registeredWatchers: {watcher1: 'watcher1'}, lastKnownPosition: position};
                let newState = reducer(state, {type: UNREGISTER_GEO_LOCATION_WATCHER, meta: 'watcher2'});
                expect(newState.registeredWatchers.watcher1).to.exist;
                expect(newState).to.be.equal(state);
            });
            it('should return same position', () =>{
                let state: GeoLocationState = {registeredWatchers: {watcher1: 'watcher1'}, lastKnownPosition: position};
                let newState = reducer(state, {type: UNREGISTER_GEO_LOCATION_WATCHER, meta: 'watcher1'});
                expect(newState.lastKnownPosition).to.be.equal(state.lastKnownPosition);
            })
        });
    });
});
