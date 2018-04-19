import { fromJS } from 'immutable'
import { 
    TOGGLE_GEOFENCE_ASSIGNMENT_DIALOG,
    FETCH_GEOFENCES,
    RADIO_BUTTON_CHANGE_GEOFENCE_ASSIGNMENT_DIALOG
} from '../action-types/index'

const initialState = fromJS({
    visibility: false,
    geofences: [],
    radioButtonValue: 0

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
        default:
            return state
    }
}


export default geofenceAssignmentDialog;