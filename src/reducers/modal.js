import { fromJS } from 'immutable'
import { TOGGLE_GEOFENCE_MODAL} from '../action-types/index'

const initialState = fromJS({
    visibility: false,

})
//!state.get('visibility')
function modal(state = initialState, action) {
    switch (action.type) {
        case TOGGLE_GEOFENCE_MODAL:
            return state.set('visibility',!state.get('visibility'))
        default:
            return state
    }
}


export default modal;