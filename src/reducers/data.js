import { fromJS } from 'immutable'
import { GOOGLE_IS_INITALIZED} from '../action-types/index'


const initialState = fromJS({
       google: '',
})

const data = ( state = initialState, action ) => {
    switch (action.type) {
      case GOOGLE_IS_INITALIZED: {
        return state.set('google', window.google)
      }
      default:
        return state
    }
  }
  
  export default data