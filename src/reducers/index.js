import modal from  './modal';
import mapData from './mapData';
import { combineReducers } from 'redux-immutable'; 

const rootReducer = combineReducers({
    modal,
    mapData
})


export default rootReducer