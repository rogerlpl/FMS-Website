import modal from  './modal';
import mapData from './mapData';
import geofences from './geofences'
import notifications from './notifications'
import user from './user'
import {  routerReducer } from 'react-router-redux'
import { combineReducers } from 'redux-immutable'; 

const rootReducer = combineReducers({
    modal,
    mapData,
    geofences,
    notifications,
    user,
    router: routerReducer
})


export default rootReducer