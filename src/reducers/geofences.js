import { fromJS } from 'immutable'
import {
    TOGGLE_GEOFENCE_ASSIGNMENT_DIALOG,
    FETCH_GEOFENCES,
    RADIO_BUTTON_CHANGE_GEOFENCE_ASSIGNMENT_DIALOG,
    FETCH_DEVICES_IN_CURRENT_GEOFENCE,
    ADD_DEVICES_TO_A_GEOFENCE,
    TOGGLE_DEVICES_COMPONENT_ASSIGNMENT_DIALOG,
    FETCH_SEARCH_DEVICES,
    DELETE_DEVICES_TO_ADD_GEOFENCE_ASSIGNMENT_DIALOG,
    CHANGE_DEVICES_TO_ADD_GEOFENCE_ASSIGNMENT_DIALOG,
    CHANGE_INPUT_GEOFENCE_ASSIGNMENT_DIALOG,
    KEY_DOWN_INPUT_GEOFENCE_ASSIGNMENT_DIALOG,
    DELETE_TEXT_GEOFENCE_ASSIGNMENT_DIALOG,
    RESET_DEVICES_TO_ADD_GEOFENCE_ASSIGNMENT_DIALOG,
    TOGGLE_OPEN_GEOFENCES_VISIBILITY_MENU,
    FALSE_OPEN_GEOFENCES_VISIBILITY_MENU,
    TOGGLE_GEOFENCES_LOCATION_MAP,
    FETCH_GEOFENCES_SCAN_DATA,
    CHANGE_DEVICES_GEOFENCE_ATTRIBUTES

} from '../action-types/index'

const initialState = fromJS({
    visibility: false,
    geofences: [],
    radioButtonValue: 0,
    devicesInCurrentGeofence: [],
    devicesInGeofences: [],
    addDevicesComponents: {
        visibility: false,
        devicesSearch: [],
        devicesToAdd: [],
        inputValue: ''
    },
    geofencesVisibilityMenu: {
        open: false
    }

})
// state.getIn(['geofencesMap', 'drewGeofences']).get(0).overlay.setMap(null)
function geofences(state = initialState, action) {
    switch (action.type) {
        case TOGGLE_GEOFENCE_ASSIGNMENT_DIALOG:
            return state.set('visibility', !state.get('visibility'))
        case TOGGLE_GEOFENCES_LOCATION_MAP:
            return state.set('geofences', action.payload.geofences)
        case FALSE_OPEN_GEOFENCES_VISIBILITY_MENU:
            return state.setIn(['geofencesVisibilityMenu','open'], false)
        case TOGGLE_OPEN_GEOFENCES_VISIBILITY_MENU:
            return state.setIn(['geofencesVisibilityMenu','open'], !state.getIn(['geofencesVisibilityMenu','open']))
        case FETCH_GEOFENCES:
            return state.set('geofences', action.payload.geofences)
        case RADIO_BUTTON_CHANGE_GEOFENCE_ASSIGNMENT_DIALOG:
            return state.set('radioButtonValue', action.payload.value)
        case FETCH_DEVICES_IN_CURRENT_GEOFENCE:
            return state.set('devicesInCurrentGeofence', action.payload.devices)
        case FETCH_GEOFENCES_SCAN_DATA:
            return state.set('devicesInGeofences', action.payload.devicesAndGeofences)
        case FETCH_SEARCH_DEVICES:
            return state.setIn(['addDevicesComponents', 'devicesSearch'], action.payload.devices)
        case TOGGLE_DEVICES_COMPONENT_ASSIGNMENT_DIALOG:
            return state.setIn(['addDevicesComponents', 'visibility'], !state.getIn(['addDevicesComponents', 'visibility']))
        case ADD_DEVICES_TO_A_GEOFENCE:
            return state
        case CHANGE_DEVICES_GEOFENCE_ATTRIBUTES:
            return state
        case CHANGE_INPUT_GEOFENCE_ASSIGNMENT_DIALOG:
            return state.setIn(['addDevicesComponents', 'inputValue'], action.payload.value)
        case KEY_DOWN_INPUT_GEOFENCE_ASSIGNMENT_DIALOG:
            return state.setIn(['addDevicesComponents', 'devicesToAdd'], state.getIn(['addDevicesComponents', 'devicesToAdd']).slice(0, state.getIn(['addDevicesComponents', 'devicesToAdd']).length - 1))
        case DELETE_DEVICES_TO_ADD_GEOFENCE_ASSIGNMENT_DIALOG: 
            return state.setIn(['addDevicesComponents', 'devicesToAdd'], action.payload.item)
        case CHANGE_DEVICES_TO_ADD_GEOFENCE_ASSIGNMENT_DIALOG:
            return state.setIn(['addDevicesComponents', 'devicesToAdd'], action.payload.item)
        case DELETE_TEXT_GEOFENCE_ASSIGNMENT_DIALOG:
            return state.setIn(['addDevicesComponents', 'inputValue'], '')
        case RESET_DEVICES_TO_ADD_GEOFENCE_ASSIGNMENT_DIALOG:
            return state.setIn(['addDevicesComponents', 'devicesToAdd'], [])

        default:
            return state
    }
}


export default geofences;