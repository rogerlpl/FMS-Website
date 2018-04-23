import { fromJS } from 'immutable'
import { 
    TOGGLE_GEOFENCE_ASSIGNMENT_DIALOG,
    FETCH_GEOFENCES,
    RADIO_BUTTON_CHANGE_GEOFENCE_ASSIGNMENT_DIALOG,
    FETCH_DEVICES_IN_CURRENT_GEOFENCE,
    ADD_DEVICES_TO_A_GEOFENCE,
    TOGGLE_DEVICES_COMPONENT_ASSIGNMENT_DIALOG,
    FETCH_SEARCH_DEVICES
} from '../action-types/index'

const initialState = fromJS({
    visibility: false,
    geofences: [],
    radioButtonValue: 0,
    devicesInCurrentGeofence: [],
    addDevicesComponents:{
        visibility: false,
        devicesSearch: [],
        devicesToAdd:[]
    }

})
// state.getIn(['geofencesMap', 'drewGeofences']).get(0).overlay.setMap(null)
function geofenceAssignmentDialog(state = initialState, action) {
    switch (action.type) {
        case TOGGLE_GEOFENCE_ASSIGNMENT_DIALOG:
            return state.set('visibility', !state.get('visibility'))
        case FETCH_GEOFENCES:
            return state.set('geofences', action.payload.geofences)
        case RADIO_BUTTON_CHANGE_GEOFENCE_ASSIGNMENT_DIALOG:
            return state.set('radioButtonValue', action.payload.value)
        case FETCH_DEVICES_IN_CURRENT_GEOFENCE:
            return state.set('devicesInCurrentGeofence', action.payload.devices)
        case FETCH_SEARCH_DEVICES:
            return state.setIn(['addDevicesComponents','devicesSearch'], action.payload.devices)
        case TOGGLE_DEVICES_COMPONENT_ASSIGNMENT_DIALOG:
            return state.setIn(['addDevicesComponents','visibility'], !state.getIn(['addDevicesComponents','visibility']))
        case ADD_DEVICES_TO_A_GEOFENCE:
            return state
        default:
            return state
    }
}


export default geofenceAssignmentDialog;