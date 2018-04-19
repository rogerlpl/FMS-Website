import { fromJS } from 'immutable'
import { 
    TOGGLE_GEOFENCE_ASSIGNMENT_DIALOG,
    FETCH_GEOFENCES
} from '../action-types/index'

const initialState = fromJS({
    visibility: false,
    geofences: []

})
// state.getIn(['geofencesMap', 'drewGeofences']).get(0).overlay.setMap(null)
function geofenceAssignmentDialog(state = initialState, action) {
    switch (action.type) {
        case TOGGLE_GEOFENCE_ASSIGNMENT_DIALOG:
            return state.set('visibility', !state.get('visibility'))
        case FETCH_GEOFENCES:
            return state.set('geofences', action.payload.geofences)
        default:
            return state
    }
}


export default geofenceAssignmentDialog;