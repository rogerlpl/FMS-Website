import { fromJS } from 'immutable'
import {
    RENDER_REPORT,

} from '../action-types/index'

const initialState = fromJS({
    file: ''

})
// state.getIn(['geofencesMap', 'drewGeofences']).get(0).overlay.setMap(null)
function report(state = initialState, action) {
    switch (action.type) {
        case RENDER_REPORT:
            return state.set('file', action.payload.file)
        default:
            return state
    }
}


export default report;