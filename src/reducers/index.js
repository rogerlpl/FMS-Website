import modal from  './modal';
import mapData from './mapData';
import geofenceAssignmentDialog from './geofenceAssignmentDialog'
import { combineReducers } from 'redux-immutable'; 

const rootReducer = combineReducers({
    modal,
    mapData,
    geofenceAssignmentDialog
})


export default rootReducer