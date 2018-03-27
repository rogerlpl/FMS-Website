import { fromJS } from 'immutable'
import { 
    TOGGLE_GEOFENCE_MODAL,
    DRAWING_GEOFENCES,
    DREW_GEOFENCES,
    RESET_DREW_GEOFENCES 
} from '../action-types/index'

const initialState = fromJS({
    visibility: false,
    geofencesMap:{
        isDrawingGeofences: true,
        drewGeofences: []
       }

})

function modal(state = initialState, action) {
    switch (action.type) {
        case TOGGLE_GEOFENCE_MODAL:
            return state.set('visibility', !state.get('visibility'))
        case DRAWING_GEOFENCES: {
            return state.setIn(['geofencesMap', 'isDrawingGeofences'], !state.getIn(['geofencesMap', 'isDrawingGeofences']))
        }
        case DREW_GEOFENCES: {
            return state.setIn(['geofencesMap', 'drewGeofences'], state.getIn(['geofencesMap', 'drewGeofences']).push(action.payload.geofence))
        }
        case RESET_DREW_GEOFENCES:
            return state.setIn(['geofencesMap', 'drewGeofences'], state.getIn(['geofencesMap', 'drewGeofences']).splice(0, 1))
        default:
            return state
    }
}


export default modal;