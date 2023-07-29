import { SET_POPUP } from "../actions/popupActions";

const initialState = {
    type: null,
    isOpen: false
}

const popupReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_POPUP:
            return {
                ...state,
                ...action.payload
            }
    
        default:
            return state;
    }
}

export default popupReducer;