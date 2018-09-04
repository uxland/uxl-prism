import * as selectors from "../../../../src/app/geo-location/selectors";
import * as appSelector from "../../../../src/app/selector";
import {expect} from 'chai';
import * as sinon from 'sinon';
import {GeoLocationState} from "../../../../src/app/geo-location/reducer";
describe('app geo location selectors', () =>{
    beforeEach(() =>{
        sinon.reset();
        sinon.restore();
    })
    describe('geo location selector', () =>{
        describe('When invoking geoLocationSelector', () =>{
            describe('and state is undefined', () =>{
                it('should return undefined', () =>{
                    sinon.stub(appSelector, 'appSelector').returns(() =>undefined);
                    let geoLocation = selectors.geoLocationSelector(undefined);
                    expect(geoLocation).to.be.undefined;
                });
            });
            describe('and state is null', () =>{
                it('should return undefined', () =>{
                    sinon.stub(appSelector, 'appSelector').value(() =>undefined);
                    let geoLocation = selectors.geoLocationSelector(null);
                    expect(geoLocation).to.be.undefined;
                });
            });
            describe('and state app is undefined', () =>{
                it('should return undefined', () =>{
                    let geoLocation = selectors.geoLocationSelector(<any>{app: undefined});
                    expect(geoLocation).to.be.undefined;
                });
            });
            describe('and state app is null', () =>{
                it('should return undefined', () =>{
                    let geoLocation = selectors.geoLocationSelector(<any>{app: null});
                    expect(geoLocation).to.be.undefined;
                });
            });
            describe('and state geo location is null', () =>{
                it('should return null', () =>{
                    expect(selectors.geoLocationSelector(<any>{app:{geoLocation: null}})).to.be.null;
                });
            });
            describe('and state geo location is undefined', () =>{
                it('should return null', () =>{
                    expect(selectors.geoLocationSelector(<any>{app:{geoLocation: undefined}})).to.be.undefined;
                });
            });
            describe('and geo location is set', () =>{
                it('should return state app geo location', () =>{
                    let geoLocationState: GeoLocationState = {registeredWatchers: {watcher1: 'myWatcher'}, lastKnownPosition: <any>{}};
                    let state = {app:{geoLocation: geoLocationState}};
                    expect(selectors.geoLocationSelector(<any>state)).to.be.equal(geoLocationState);
                    let geoLocationState2: GeoLocationState = {registeredWatchers: {watcher: 'otherWatcher'}, lastKnownPosition: <any>{}};
                    expect(selectors.geoLocationSelector(<any>{app: {geoLocation: geoLocationState2}})).to.be.equal(geoLocationState2);
                });
            });
        });
    });
    describe('last known position selector', () =>{
        describe('When invoking lastKnownPositionSelector', () =>{
            describe('and state is undefined', () =>{
                it('should return undefined', () =>{
                    sinon.stub(selectors, 'geoLocationSelector').returns(undefined);
                    expect(selectors.lastKnownPositionSelector(undefined)).to.be.undefined;
                });
            });
            describe('and state is null', () =>{
                it('should return undefined', () =>{
                    sinon.stub(selectors, 'geoLocationSelector').returns(null);
                    expect(selectors.lastKnownPositionSelector(null)).to.be.undefined;
                });
            });
            describe('and state app is undefined', () =>{
                it('should return undefined', () =>{
                    expect(selectors.lastKnownPositionSelector(<any>{app: undefined})).to.be.undefined;
                })
            });
            describe('and state app is null', () =>{
                it('should return undefined', () =>{
                    expect(selectors.lastKnownPositionSelector(<any>{app: null})).to.be.undefined;
                })
            });
            describe('and state geo location is null', () =>{
                it('should return undefined', () =>{
                    expect(selectors.lastKnownPositionSelector(<any>{app:{geoLocation: null}})).to.be.undefined;
                });
            });
            describe('and state geo location is undefined', () =>{
                it('should return null', () =>{
                    expect(selectors.lastKnownPositionSelector(<any>{app:{geoLocation: undefined}})).to.be.undefined;
                });
            });
            describe('and state last known position is null', () =>{
                it('should return null', () =>{
                    expect(selectors.lastKnownPositionSelector(<any>{app:{geoLocation: {lastKnownPosition: null}}})).to.be.null;
                })
            });
            describe('and state last known position is undefined', () =>{
                it('should return undefined', () =>{
                    expect(selectors.lastKnownPositionSelector(<any>{app:{geoLocation: {lastKnownPosition: undefined}}})).to.be.undefined;
                })
            });
            describe('and state last known position is set', () =>{
                it('should return state last known position', () =>{
                    let position: Position =  {timestamp: Date.now(), coords: {speed: 120, heading: 1, altitudeAccuracy: 2.0, accuracy: 1.0, altitude: 150, latitude: 2, longitude: 42}};
                    expect(selectors.lastKnownPositionSelector(<any>{app: {geoLocation: {lastKnownPosition: position}}})).to.be.equal(position);
                    let otherPosition: Position =  {timestamp: Date.now(), coords: {speed: 80, heading: 2, altitudeAccuracy: 0.50, accuracy: 2, altitude: 0, latitude: 50, longitude: 30}};
                    expect(selectors.lastKnownPositionSelector(<any>{app: {geoLocation: {lastKnownPosition: otherPosition}}})).to.be.equal(otherPosition);
                })
            });
        });
    });
    describe('registered watchers selectors', () =>{
        describe('When invoking registeredWatchersSelector', () =>{
            describe('and state is undefined', () =>{
                it('should return undefined', () =>{
                    sinon.stub(selectors, 'geoLocationSelector').returns(undefined);
                    expect(selectors.registeredWatchersSelector(undefined)).to.be.undefined;
                });
            });
            describe('and state is null', () =>{
                it('should return undefined', () =>{
                    sinon.stub(selectors, 'geoLocationSelector').returns(null);
                    expect(selectors.registeredWatchersSelector(null)).to.be.undefined;
                });
            });
            describe('and state app is undefined', () =>{
                it('should return undefined', () =>{
                    expect(selectors.registeredWatchersSelector(<any>{app: undefined})).to.be.undefined;
                });
            });
            describe('and state app is null', () =>{
                it('should return undefined', () =>{
                    expect(selectors.registeredWatchersSelector(<any>{app: null})).to.be.undefined;
                });
            });
            describe('and state geo location is null', () =>{
                it('should return undefined', () =>{
                    expect(selectors.registeredWatchersSelector(<any>{app:{geoLocation: null}})).to.be.undefined;
                });
            });
           describe('and state geo location is undefined', () =>{
                it('should return null', () =>{
                    expect(selectors.registeredWatchersSelector(<any>{app:{geoLocation: undefined}})).to.be.undefined;
                });
            });
             describe('and state registered watchers is null', () =>{
                it('should return null', () =>{
                    expect(selectors.registeredWatchersSelector(<any>{app:{geoLocation: {registeredWatchers: null}}})).to.be.null;
                });
            });
            describe('and state registered watcher is undefined', () =>{
                it('should return undefined', () =>{
                    expect(selectors.registeredWatchersSelector(<any>{app:{geoLocation: {registeredWatchers: undefined}}})).to.be.undefined;
                });
            });
            describe('and state registered watchers is set', () =>{
                it('should return state last known position', () =>{
                    let watchers = {watcher1: 'watcher1'};
                    expect(selectors.registeredWatchersSelector(<any>{app: {geoLocation: {registeredWatchers: watchers}}})).to.be.equal(watchers);
                    let otherWatchers = {watcher2: 'my-watcher', watcher3: 'another watcher'};
                    expect(selectors.registeredWatchersSelector(<any>{app: {geoLocation: {registeredWatchers: otherWatchers}}})).to.be.equal(otherWatchers);
                });
            });
        });
    })
});