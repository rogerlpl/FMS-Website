import { fromJS } from 'immutable'
import {
    TOGGLE_USER_LOGGING,
    FETCH_USER_DATA,
    LOGGING_FAILED
} from '../action-types/index'

const initialState = fromJS({
    isLogged: false,
    loggingFailed: false,
    data: {},
})

function user(state = initialState, action) {
    switch (action.type) {
       case TOGGLE_USER_LOGGING:
       return state.set('isLogged', !state.get('isLogged'))
       case FETCH_USER_DATA:
       return state.set('data', action.payload.data)
       case LOGGING_FAILED:
       return state.set('loggingFailed', action.payload.state)
        default:
            return state
    }
}


export default user;