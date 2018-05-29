import modal from  './modal';
import mapData from './mapData';
import geofences from './geofences'
import notifications from './notifications'
import report from './report'
import user from './user'
import {  routerReducer } from 'react-router-redux'
import { combineReducers } from 'redux-immutable'; 

const rootReducer = combineReducers({
    modal,
    mapData,
    geofences,
    notifications,
    user,
    report,
    router: routerReducer
})


export default rootReducer