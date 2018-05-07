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
    DELETE_TEXT_GEOFENCE_ASSIGNMENT_DIALOG,
    RESET_DEVICES_TO_ADD_GEOFENCE_ASSIGNMENT_DIALOG,
    TOGGLE_OPEN_GEOFENCES_VISIBILITY_MENU,
    FALSE_OPEN_GEOFENCES_VISIBILITY_MENU,
    TOGGLE_GEOFENCES_LOCATION_MAP,
    FETCH_GEOFENCES_SCAN_DATA,
    CHANGE_DEVICES_GEOFENCE_ATTRIBUTES,
    FETCH_UNREAD_NOTIFICATIONS,
    FETCH_READ_NOTIFICATIONS,
    CREATE_EVENT,
    EVENT_READ,
    TOGGLE_OPEN_NOTIFICATION_MENU,
    FALSE_OPEN_NOTIFICATION_MENU,
    TOGGLE_USER_LOGGING,
    FETCH_USER_DATA,
    LOGGING_FAILED,
    TOGGLE_INFOWINDOW
}
    from '../action-types/index'

// const baseAPIURL = 'http://localhost:58496/api'
const baseAPIURL = 'http://imecap.com.do/api/api'

export function toggleUserLogging() {
    return {
        type: TOGGLE_USER_LOGGING,
    }
}
export function toggleInfoWindow() {
    return {
        type: TOGGLE_INFOWINDOW,
    }
}
export function loggingFailed(state) {
    return {
        type: LOGGING_FAILED,
        payload: {
            state
        }
    }
}
export function toggleDeviceComponents() {
    return {
        type: TOGGLE_DEVICES_COMPONENT_ASSIGNMENT_DIALOG,
    }
}
export function toggleNotification() {
    return {
        type: TOGGLE_OPEN_NOTIFICATION_MENU,
    }
}
export function falseNotificationMenu() {
    return {
        type: FALSE_OPEN_NOTIFICATION_MENU,
    }
}
export function falseGeofencesMenu() {
    return {
        type: FALSE_OPEN_GEOFENCES_VISIBILITY_MENU,
    }
}
export function toggleGeofencesMenu() {
    return {
        type: TOGGLE_OPEN_GEOFENCES_VISIBILITY_MENU,
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
export function toggleGeofencesLocationMap(geofences) {
    return {
        type: TOGGLE_GEOFENCES_LOCATION_MAP,
        payload: {
            geofences
        }
    }
}
export function resetDevicesToAddGeofenceAssignmentDialog() {
    return {
        type: RESET_DEVICES_TO_ADD_GEOFENCE_ASSIGNMENT_DIALOG,
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
export function saveCurrentGeofence(paths, name, type) {
    return async (dispatch) => {

        dispatch(toggleSaveGeofenceDialog())
        dispatch(toggleGeofenceModal())
        dispatch(isDrawingGeofences())
        dispatch(saveGeofencePath(paths))

        const attributes = {
            visible: false
        }

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
                    attributes: JSON.stringify(attributes),
                    type: type
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

            geofences.map(geofence => {
                geofence.area = JSON.parse(geofence.area)
                geofence.attributes = JSON.parse(geofence.attributes)
                return geofence
            })

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
        const status = response.status
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

export function fetchSearchDevices(geofenceid) {
    return async (dispatch) => {
        try {
            const response = await fetch(`${baseAPIURL}/searchdevices?geofenceid=${geofenceid}`);
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

            dispatch(fetchAddDevicesToAGeofenceSucced())
        } catch (err) {
            console.log("Ha ocurrido un error en el servidor insertando la data de los dispositivos en las geocercas: " + err)
        }
    }
}
export function fetchChangeDeviceGeofenceAttributesSucced() {
    return {
        type: CHANGE_DEVICES_GEOFENCE_ATTRIBUTES,
    }
}

export function fetchChangeDeviceGeofenceAttributes(deviceid, geofenceid, attributes) {
    return async (dispatch) => {
        try {
            await fetch(`${baseAPIURL}/changedevicegeofenceattribute?deviceid=${deviceid}&geofenceid=${geofenceid}&attributes=${attributes}`,
                {
                    method: "post"
                });
            
            dispatch(fetchChangeDeviceGeofenceAttributesSucced())
        } catch (err) {
            console.log("Ha ocurrido un error en el servidor insertando la data de los atributos que estan  dispositivos en las geocercas: " + err)
        }
    }
}
export function fetchEventReadSucced(id) {
    return {
        type: EVENT_READ,
        payload:{
            id
        }
    }
}

export function fetchEventRead(id, attributes) {
    return async (dispatch) => {
        try {
            await fetch(`${baseAPIURL}/events?id=${id}&attributes=${attributes}`,
                {
                    method: "patch"
                });
                
            dispatch(fetchEventReadSucced(id))
        } catch (err) {
            console.log("Ha ocurrido un error en el servidor tratando de marcar como leida la notificacion: " + err)
        }
    }
}
export function fetchCreateEventSucced() {
    return {
        type: CREATE_EVENT,
    }
}

export function fetchCreateEvent(type,deviceid,geofenceid, attributes) {
    return async (dispatch) => {
        try {
            await fetch(`${baseAPIURL}/CreateEvent?type=${type}&deviceid=${deviceid}&geofenceid=${geofenceid}&attributes=${attributes}`,
                {
                    method: "post"
                });

            dispatch(fetchCreateEventSucced())

        } catch (err) {
            console.log("Ha ocurrido un error en el servidor tratando de crear un evento: " + err)
        }
    }
}
export function fetchGeofencesScanDataSucced(devicesAndGeofences) {
    return {
        type: FETCH_GEOFENCES_SCAN_DATA,
        payload: {
            devicesAndGeofences
        }
    }
}

export function fetchGeofencesScanData() {
    return async (dispatch) => {
        try {

            const response = await fetch(`${baseAPIURL}/alldevicesgeofences`);
            const devicesAndGeofences = await response.json();
            
            devicesAndGeofences.map(geofence => {
                geofence.geofenceArea = JSON.parse(geofence.geofenceArea)

                if (geofence.devices.length > 0) {

                    geofence.devices = geofence.devices.map(device => {

                        device.attributes = JSON.parse(device.attributes)
                        return device
                    })
                }

                return geofence
            })
            
            dispatch(fetchGeofencesScanDataSucced(devicesAndGeofences))

        } catch (err) {
            console.log("Ha ocurrido un error en el servidor trayendo la data para el scan de las geocercas: " + err)
        }
    }
}

export function fetchReadNotificationsSucced(notifications) {
    return {
        type: FETCH_READ_NOTIFICATIONS,
        payload: {
            notifications
        }
    }
}

export function fetchUnReadNotificationsSucced(notifications) {
    return {
        type: FETCH_UNREAD_NOTIFICATIONS,
        payload: {
            notifications
        }
    }
}

export function fetchNotifications() {
    return async (dispatch) => {
        try {

            const response = await fetch(`${baseAPIURL}/events`);
            const notifications = await response.json();

            notifications.map(notification => {
                notification.attributes = JSON.parse(notification.attributes)
                return notification
            })

            const unread = notifications.filter(notification =>{
                if(!notification.attributes.read) return  notification
                else return false
            })

            const read= notifications.filter(notification =>{
                if(notification.attributes.read) return  notification
                else return false
            }) 

            dispatch(fetchUnReadNotificationsSucced(unread))
            
            dispatch(fetchReadNotificationsSucced(read))

        } catch (err) {
            console.log("Ha ocurrido un error en el servidor trayendo las notificaciones: " + err)
        }
    }
}
export function fetchUserDataSucced(data) {
    return {
        type: FETCH_USER_DATA,
        payload: {
            data
        }
    }
}

export function fetchUserData(name) {
    return async (dispatch) => {

        const response = await fetch(`${baseAPIURL}/users?name=${name}`);
        const status = response.status
        try {

            
            const userData = await response.json();

            userData.attributes = JSON.parse(userData.attributes)


            dispatch(fetchUserDataSucced(userData))
            

        } catch (err) {
            console.log("Ha ocurrido un error en el servidor trayendo la data del usuario: " + err)
            if (status === 404) {
                console.clear()
                dispatch(fetchUserDataSucced(''))
           }
        }
    }
}

