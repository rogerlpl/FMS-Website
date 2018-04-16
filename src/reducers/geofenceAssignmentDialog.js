import { fromJS } from 'immutable'
import { 
    TOGGLE_GEOFENCE_ASSIGNMENT_DIALOG
} from '../action-types/index'

const initialState = fromJS({
    visibility: false,

})
// state.getIn(['geofencesMap', 'drewGeofences']).get(0).overlay.setMap(null)
function geofenceAssignmentDialog(state = initialState, action) {
    switch (action.type) {
        case TOGGLE_GEOFENCE_ASSIGNMENT_DIALOG:
            return state.set('visibility', !state.get('visibility'))
        default:
            return state
    }
}


export default geofenceAssignmentDialog;