import {
    TOGGLE_GEOFENCE_MODAL,
    GOOGLE_IS_INITALIZED,
    FETCH_DEVICES_DATA,
    DRAWING_GEOFENCES,
    DREW_GEOFENCES,
    RESET_DREW_GEOFENCES
}
    from '../action-types/index'


export function toggleGeofenceModal() {
    return {
        type: TOGGLE_GEOFENCE_MODAL,
    }
}
export function isDrawingGeofences() {
    return {
        type: DRAWING_GEOFENCES,
    }
}
export function drewGeofences(geofence) {
    return {
        type: DREW_GEOFENCES,
        payload:{
            geofence
        }
    }
}
export function resetDrewGeofences() {
    return {
        type: RESET_DREW_GEOFENCES,
    }
}

export function googleIsInitalized() {
    return {
        type: GOOGLE_IS_INITALIZED,
    }
}

export function fetchDevicesSucced(devicesData) {
    return {
        type: FETCH_DEVICES_DATA,
        payload:{
            devicesData
        }
    }
}

export function fetchDevicesData() {
    return async (dispatch) => {
       try{
        const response = await fetch('http://localhost:58496/api/positions');
        const devices = await response.json();

        dispatch(fetchDevicesSucced(devices)) 
    }catch(err){
        console.log("Ha ocurrido un error en el servidor trayendo la data de los dispositivos: " + err)
    }
    }
}

