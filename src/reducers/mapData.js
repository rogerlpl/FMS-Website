import { fromJS } from 'immutable'
import { 
  GOOGLE_IS_INITALIZED,
  FETCH_DEVICES_DATA
} from '../action-types/index'



const initialState = fromJS({
       google: '',
       locationMap: {
         devices: [],
        googleReady: false
       }
})

const mapData = ( state = initialState, action ) => {
    switch (action.type) {
      case GOOGLE_IS_INITALIZED: {
        return state.set('google', window.google)
      }
      case FETCH_DEVICES_DATA:
        return state.setIn(['locationMap','devices'], action.payload.devicesData)
      default:
        return state
    }
  }
  
  export default mapData