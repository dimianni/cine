import { combineReducers } from 'redux';
import authReducer from './authReducer';
import popupReducer from './popupReducer';

const rootReducer = combineReducers({
    auth: authReducer,
    popup: popupReducer,
});

export default rootReducer;