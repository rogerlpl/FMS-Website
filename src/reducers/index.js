import modal from  './modal';
import mapData from './mapData';
import geofences from './geofences'
import { combineReducers } from 'redux-immutable'; 

const rootReducer = combineReducers({
    modal,
    mapData,
    geofences
})


export default rootReducer