import { fromJS } from 'immutable'
import { 
  GOOGLE_IS_INITALIZED,
  FETCH_DEVICES_DATA,
  DRAW_GEOFENCES_LOCATION_MAP,
  DELETE_GEOFENCES_LOCATION_MAP
} from '../action-types/index'



const initialState = fromJS({
       google: '',
       locationMap: {
         devices: [],
         googleReady: false,
         visibleGeofences: []
       },
       
})

const mapData = ( state = initialState, action ) => {
    switch (action.type) {
      case GOOGLE_IS_INITALIZED: {
        return state.set('google', window.google)
      }
      case FETCH_DEVICES_DATA:
      return state.setIn(['locationMap','devices'], action.payload.devicesData)
      case DRAW_GEOFENCES_LOCATION_MAP:
      return state.setIn(['locationMap','visibleGeofences'], state.getIn(['locationMap','visibleGeofences'].push(action.payload.geofence)))
      case DELETE_GEOFENCES_LOCATION_MAP:
        return state.setIn(['locationMap','visibleGeofences'],state.getIn(['locationMap','visibleGeofences'].map(geofence => (
          action.payload.geofenceid === geofence.id ? null 
          : geofence
        ))))
      default:
        return state
    }
  }
  
  export default mapData