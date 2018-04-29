import modal from  './modal';
import mapData from './mapData';
import geofences from './geofences'
import notifications from './notifications'
import { combineReducers } from 'redux-immutable'; 

const rootReducer = combineReducers({
    modal,
    mapData,
    geofences,
    notifications
})


export default rootReducer