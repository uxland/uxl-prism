import configureStore from 'redux-mock-store';
import * as sinon from 'sinon';
import {expect} from 'chai';
import * as store from "../../../../src/store";
import * as geoLocationWatcherRegistry from "../../../../src/app/geo-location/geo-location-watcher-registry";
import {REGISTER_GEO_LOCATION_WATCHER, UNREGISTER_GEO_LOCATION_WATCHER} from "../../../../src/app/geo-location/reducer";

const mockStore = configureStore([]);

describe('geo location watcher registry', () =>{
    beforeEach(() =>{
        sinon.restore();
        sinon.reset();
        //geoLocationWatcherRegistry.watchId = undefined;
    });
    describe('When invoking registerGeoLocationWatcher with a watcherId',() =>{
        it('should dispatch an action to the store', () =>{
            let st = mockStore({});
            sinon.stub(store, 'store').value(st);
            geoLocationWatcherRegistry.registerGeoLocationWatcher('my-watcher-id');
            expect(st.getActions()).to.be.eql([{type: REGISTER_GEO_LOCATION_WATCHER, payload: 'my-watcher-id', meta: 'my-watcher-id'}]);
            geoLocationWatcherRegistry.registerGeoLocationWatcher('other-watcher');
            expect(st.getActions()[1]).to.be.eql({type: REGISTER_GEO_LOCATION_WATCHER, payload: 'other-watcher', meta: 'other-watcher'});
        });
        describe('and no watchId is defined', () =>{
            it('should subscribe to geo location watch event and set watch id', () =>{
                let geoLocation = {watchPosition: sinon.stub().returns(123456)};
                (<any>navigator).geolocation = geoLocation;
                geoLocationWatcherRegistry.registerGeoLocationWatcher('my-watcher');
                expect(geoLocation.watchPosition.calledOnce).to.be.true;
                expect(geoLocationWatcherRegistry.watchId).to.be.eql(123456)
            });
        });
        describe('and watchId is defined', () =>{
            it('should not subscribe to geoLocation watch event neither set event', () =>{
                let watchIdStub = sinon.stub(geoLocationWatcherRegistry, 'watchId').value(1111);
                let geoLocation = {watchPosition: sinon.stub().returns(123456)};
                (<any>navigator).geolocation = geoLocation;
                geoLocationWatcherRegistry.registerGeoLocationWatcher('my-watcher');
                expect(geoLocation.watchPosition.calledOnce).to.be.false;
            })
        });
    });
    describe('When invoking unregisterGeoLocationWatcher with a watcherId', () =>{
        it('should dispatch an action to the store', () =>{
            let st = mockStore({});
            sinon.stub(store, 'store').value(st);
            geoLocationWatcherRegistry.unregisterGeoLocationWatcher('my-watcher-id');
            expect(st.getActions()).to.be.eql([{type: UNREGISTER_GEO_LOCATION_WATCHER, payload: 'my-watcher-id', meta: 'my-watcher-id'}]);
            geoLocationWatcherRegistry.unregisterGeoLocationWatcher('other-watcher');
            expect(st.getActions()[1]).to.be.eql({type: UNREGISTER_GEO_LOCATION_WATCHER, payload: 'other-watcher', meta: 'other-watcher'});
        });
    });
});