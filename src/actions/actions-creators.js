import {
    TOGGLE_GEOFENCE_MODAL,
    GOOGLE_IS_INITALIZED,
    FETCH_DEVICES_DATA,
    DRAWING_GEOFENCES,
    DREW_GEOFENCES,
    RESET_DREW_GEOFENCES,
    DELETE_CURRENT_GEOFENCES,
    TOGGLE_SAVE_GEOFENCE_DIALOG,
    SAVE_GEOFENCE_NAME,
    SAVE_GEOFENCE_PATH,
    TOGGLE_GEOFENCE_ASSIGNMENT_DIALOG,
    FETCH_GEOFENCES,
    RADIO_BUTTON_CHANGE_GEOFENCE_ASSIGNMENT_DIALOG
}
    from '../action-types/index'

const baseAPIURL = 'http://localhost:58496/api'

export function toggleGeofenceModal() {
    return {
        type: TOGGLE_GEOFENCE_MODAL,
    }
}
export function toggleGeofenceAssignmentDialog() {
    return {
        type: TOGGLE_GEOFENCE_ASSIGNMENT_DIALOG,
    }
}
export function toggleSaveGeofenceDialog() {
    return {
        type: TOGGLE_SAVE_GEOFENCE_DIALOG,
    }
}

export function radioButtonChangeGeofenceAssignmentDialog (value){
    return {
        type: RADIO_BUTTON_CHANGE_GEOFENCE_ASSIGNMENT_DIALOG,
        payload: {
            value
        }
    }
}
export function saveGeofenceName (name){
    return {
        type: SAVE_GEOFENCE_NAME,
        payload: {
            name
        }
    }
}
export function saveCurrentGeofence (paths,name){
    return async (dispatch) => {
        
        dispatch(toggleSaveGeofenceDialog())
        dispatch(toggleGeofenceModal())
        dispatch(isDrawingGeofences())
        dispatch(saveGeofencePath(paths))

        try{
         await fetch(`${baseAPIURL}/geofences`, {
            method: "post",
            headers: {  
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              name: name,
              area: JSON.stringify(paths),
              type: 'Polygon'
            })
          })
     }catch(err){
         console.log("Ha ocurrido un error en el servidor guardando la geocerca " + err)
     }
     }
    
}

export function saveGeofencePath(paths) {
    return {
        type: SAVE_GEOFENCE_PATH,
        payload:{
            paths
        }
    }
}
export function deleteCurrentGeofence(geofence) {
    return {
        type: DELETE_CURRENT_GEOFENCES,
        payload:{
            geofence
        }
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
        const response = await fetch(`${baseAPIURL}/positions`);
        const devices = await response.json();

        dispatch(fetchDevicesSucced(devices)) 
    }catch(err){
        console.log("Ha ocurrido un error en el servidor trayendo la data de los dispositivos: " + err)
    }
    }
}

export function fetchGeofencesSucced(geofences) {
    return {
        type: FETCH_GEOFENCES,
        payload:{
            geofences
        }
    }
}

export function fetchGeofencesData() {
    return async (dispatch) => {
       try{
        const response = await fetch(`${baseAPIURL}/geofences`);
        const geofences = await response.json();

        dispatch(fetchGeofencesSucced(geofences)) 
    }catch(err){
        console.log("Ha ocurrido un error en el servidor trayendo la data de las geocercas: " + err)
    }
    }
}

