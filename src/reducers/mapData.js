import { fromJS } from 'immutable'
import { 
  GOOGLE_IS_INITALIZED,
  FETCH_DEVICES_DATA,
  TOGGLE_INFOWINDOW
} from '../action-types/index'



const initialState = fromJS({
       google: '',
       locationMap: {
         devices: [],
         infoWindowIsOpen: false,
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
      case TOGGLE_INFOWINDOW:
      return state.setIn(['locationMap','infoWindowIsOpen'],!state.getIn(['locationMap','infoWindowIsOpen'] ))
      default:
        return state
    }
  }
  
  export default mapData