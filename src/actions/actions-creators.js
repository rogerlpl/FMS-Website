import {
    TOGGLE_GEOFENCE_MODAL,
    GOOGLE_IS_INITALIZED,
    GOOGLE_IS_READY,
    FETCH_DEVICES_DATA,
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

export function googleIsReady() {
    return {
        type: GOOGLE_IS_READY,
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

