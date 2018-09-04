import * as sinon from 'sinon';
import * as store from "../../../../src/store";
import {setLastPosition} from "../../../../src/app/geo-location/set-last-position";
import {expect} from 'chai';
import {Action} from "@uxland/uxl-redux/create-action";
import {SET_LAST_POSITION_ACTION} from "../../../../src/app/geo-location/reducer";
import configureStore from 'redux-mock-store';
const middlewares  = [];
const mockStore = configureStore(middlewares);
describe('set last position', () =>{
    const position: Position = {
        coords: {
            longitude: 2,
            latitude: 43,
            altitude: 180,
            accuracy: 1.0,
            altitudeAccuracy: 0.98,
            heading: 1,
            speed: 120
        },
        timestamp: performance.now()
    };
    beforeEach(() =>{
        sinon.restore();
        sinon.reset();
    })
    describe('When invoking set last position', () =>{
        describe('with a position', () =>{
            it('should dispatch an action to the the store', () =>{
                let st = mockStore({});
                sinon.stub(store, 'store').value(st);
                setLastPosition(position);
                expect(st.getActions()).to.be.eql([{type: SET_LAST_POSITION_ACTION, payload: position}]);
            });
        });
    });
});