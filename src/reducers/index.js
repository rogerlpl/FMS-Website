import modal from  './modal';
import data from './data';
import { combineReducers } from 'redux-immutable'; 

const rootReducer = combineReducers({
    modal,
    data
})


export default rootReducer