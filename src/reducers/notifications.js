import { fromJS } from 'immutable'
import {
    FETCH_UNREAD_NOTIFICATIONS,
    FETCH_READ_NOTIFICATIONS,
    CREATE_EVENT,
    EVENT_READ,
    TOGGLE_OPEN_NOTIFICATION_MENU,
    FALSE_OPEN_NOTIFICATION_MENU
} from '../action-types/index'

const initialState = fromJS({
    visibility: false,
    type:{
        unread:[],
        read:[]
    }

})

function notifications(state = initialState, action) {
    switch (action.type) {
       case FETCH_UNREAD_NOTIFICATIONS:
       return state.setIn(['type','unread'], action.payload.notifications)
       case FETCH_READ_NOTIFICATIONS:
       return state.setIn(['type','read'], action.payload.notifications)
       case CREATE_EVENT:
       return state
       case TOGGLE_OPEN_NOTIFICATION_MENU:
       return state.set('visibility', !state.get('visiblity'))
       case FALSE_OPEN_NOTIFICATION_MENU:
       return state.set('visibility', false)
       case EVENT_READ:
       return state.setIn(['type','unread'], state.getIn(['type','unread']).filter(notification=>{
           if(action.payload.id === notification.id) {
               return false
            }else { return notification}
       }))

        default:
            return state
    }
}


export default notifications;