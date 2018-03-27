import {
    TOGGLE_GEOFENCE_MODAL,
    GOOGLE_IS_INITALIZED
}
    from '../action-types/index'


export function toggleGeofenceModal() {
    return {
        type: TOGGLE_GEOFENCE_MODAL,
    }
}

export function googleIsInitalized() {
    return {
        type: GOOGLE_IS_INITALIZED,
    }
}