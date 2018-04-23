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
    RADIO_BUTTON_CHANGE_GEOFENCE_ASSIGNMENT_DIALOG,
    FETCH_DEVICES_IN_CURRENT_GEOFENCE,
    ADD_DEVICES_TO_A_GEOFENCE,
    TOGGLE_DEVICES_COMPONENT_ASSIGNMENT_DIALOG,
    FETCH_SEARCH_DEVICES,
    DELETE_DEVICES_TO_ADD_GEOFENCE_ASSIGNMENT_DIALOG,
    CHANGE_DEVICES_TO_ADD_GEOFENCE_ASSIGNMENT_DIALOG,
    CHANGE_INPUT_GEOFENCE_ASSIGNMENT_DIALOG,
    KEY_DOWN_INPUT_GEOFENCE_ASSIGNMENT_DIALOG,
    DELETE_TEXT_GEOFENCE_ASSIGNMENT_DIALOG
}
    from '../action-types/index'

const baseAPIURL = 'http://localhost:58496/api'

export function toggleDeviceComponents() {
    return {
        type: TOGGLE_DEVICES_COMPONENT_ASSIGNMENT_DIALOG,
    }
}
export function deteleTextGeofenceAssignmentDialog() {
    return {
        type: DELETE_TEXT_GEOFENCE_ASSIGNMENT_DIALOG,
    }
}
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
export function radioButtonChangeGeofenceAssignmentDialog(value) {
    return {
        type: RADIO_BUTTON_CHANGE_GEOFENCE_ASSIGNMENT_DIALOG,
        payload: {
            value
        }
    }
}
export function saveGeofenceName(name) {
    return {
        type: SAVE_GEOFENCE_NAME,
        payload: {
            name
        }
    }
}
export function deleteDeviceToAddGeofenceAssignmentDialog(item) {
    return {
        type: DELETE_DEVICES_TO_ADD_GEOFENCE_ASSIGNMENT_DIALOG,
        payload: {
            item
        }
    }
}
export function keyDownInputGeofenceAssignmentDialog() {
    return {
        type: KEY_DOWN_INPUT_GEOFENCE_ASSIGNMENT_DIALOG,
    }
}
export function changeInputGeofenceAssignmentDialog(value) {
    return {
        type: CHANGE_INPUT_GEOFENCE_ASSIGNMENT_DIALOG,
        payload: {
            value
        }
    }
}
export function changeDevicesToAddGeofenceAssignmentDialog(item) {
    return {
        type: CHANGE_DEVICES_TO_ADD_GEOFENCE_ASSIGNMENT_DIALOG,
        payload: {
            item
        }
    }
}
export function saveCurrentGeofence(paths, name) {
    return async (dispatch) => {

        dispatch(toggleSaveGeofenceDialog())
        dispatch(toggleGeofenceModal())
        dispatch(isDrawingGeofences())
        dispatch(saveGeofencePath(paths))

        try {
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
        } catch (err) {
            console.log("Ha ocurrido un error en el servidor guardando la geocerca " + err)
        }
    }

}

export function saveGeofencePath(paths) {
    return {
        type: SAVE_GEOFENCE_PATH,
        payload: {
            paths
        }
    }
}
export function deleteCurrentGeofence(geofence) {
    return {
        type: DELETE_CURRENT_GEOFENCES,
        payload: {
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
        payload: {
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
        payload: {
            devicesData
        }
    }
}

export function fetchDevicesData() {
    return async (dispatch) => {
        try {
            const response = await fetch(`${baseAPIURL}/positions`);
            const devices = await response.json();

            dispatch(fetchDevicesSucced(devices))
        } catch (err) {
            console.log("Ha ocurrido un error en el servidor trayendo la data de los dispositivos: " + err)
        }
    }
}

export function fetchGeofencesSucced(geofences) {
    return {
        type: FETCH_GEOFENCES,
        payload: {
            geofences
        }
    }
}

export function fetchGeofencesData() {
    return async (dispatch) => {
        try {
            const response = await fetch(`${baseAPIURL}/geofences`);
            const geofences = await response.json();

            dispatch(fetchGeofencesSucced(geofences))
        } catch (err) {
            console.log("Ha ocurrido un error en el servidor trayendo la data de las geocercas: " + err)
        }
    }
}

export function fetchDevicesInGeofenceSucced(devices) {
    return {
        type: FETCH_DEVICES_IN_CURRENT_GEOFENCE,
        payload: {
            devices
        }
    }
}

export function fetchDevicesInGeofence(geofenceid) {
    return async (dispatch) => {
     
   
     const response = await fetch(`${baseAPIURL}/devicesgeofences/${geofenceid}`);
     const status=response.status
            try {
               
                const devices = await response.json();
            
                dispatch(fetchDevicesInGeofenceSucced(devices))
            } catch (err) {
               
                console.log("Ha ocurrido un error en el servidor trayendo la data de los dispostivos en geocercas: " + err)
                if (status === 404) {
                    console.clear()
                }
                dispatch(fetchDevicesInGeofenceSucced(''))
            }
       
    }
}
export function fetchSearchDevicesSucced(devices) {
    return {
        type: FETCH_SEARCH_DEVICES,
        payload: {
            devices
        }
    }
}

export function fetchSearchDevices() {
    return async (dispatch) => {
        try {
            const response = await fetch(`${baseAPIURL}/devices/`);
            const devices = await response.json();

            dispatch(fetchSearchDevicesSucced(devices))
        } catch (err) {
            console.log("Ha ocurrido un error en el servidor trayendo la data de los dispostivos para el buscador: " + err)
        }
    }
}
export function fetchAddDevicesToAGeofenceSucced() {
    return {
        type: ADD_DEVICES_TO_A_GEOFENCE,
    }
}

export function fetchAddDevicesToAGeofence(deviceid, geofenceid) {
    return async (dispatch) => {
        try {
            await fetch(`${baseAPIURL}/devicesgeofences?deviceid=${deviceid}&geofenceid=${geofenceid}`,
                {
                    method: "post"
                });
            //const devices = await response.json();

            dispatch(fetchAddDevicesToAGeofenceSucced())
        } catch (err) {
            console.log("Ha ocurrido un error en el servidor insertando la data de los dispositivos en las geocercas: " + err)
        }
    }
}

