import { SET_USER, CLEAR_USER, UPDATE_USER } from '../actions/authActions';

const initialState = {
    status: "unauthenticated",
    user: null,
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER:
            return {
                ...state,
                status: action.payload.status,
                user: action.payload.user,
            };
        case CLEAR_USER:
            return {
                ...state,
                status: "unauthenticated",
                user: null,
            };
        case UPDATE_USER:
            return {
                ...state,
                user: action.payload,
            };
        default:
            return state;
    }
};

export default authReducer;