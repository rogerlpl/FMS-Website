import { fromJS } from 'immutable'
import { 
    TOGGLE_GEOFENCE_MODAL,
    DRAWING_GEOFENCES,
    DREW_GEOFENCES,
    RESET_DREW_GEOFENCES,
    DELETE_CURRENT_GEOFENCES,
    TOGGLE_SAVE_GEOFENCE_DIALOG,
    SAVE_GEOFENCE_NAME,
    SAVE_GEOFENCE_PATH
} from '../action-types/index'

const initialState = fromJS({
    visibility: false,
    geofencesMap:{
        isDrawingGeofences: true,
        drewGeofences: [],
        paths: []
       },
    dialog:{
        visibility: false,
        geofenceName: ''
    }

})
// state.getIn(['geofencesMap', 'drewGeofences']).get(0).overlay.setMap(null)
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
        case DELETE_CURRENT_GEOFENCES:{
            action.payload.geofence.setMap(null)
             return state
        }
        case SAVE_GEOFENCE_PATH:{
            return state.setIn(['geofencesMap','paths'], action.payload.paths)
        }
        case SAVE_GEOFENCE_NAME:{
            return state.setIn(['dialog', 'geofenceName'], action.payload.name)
        }
        case TOGGLE_SAVE_GEOFENCE_DIALOG:
             return state.setIn(['dialog','visibility'], !state.getIn(['dialog','visibility']) )
           
        default:
            return state
    }
}


export default modal;