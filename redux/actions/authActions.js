// Action Types
export const SET_USER = 'SET_USER';
export const CLEAR_USER = 'CLEAR_USER';
export const UPDATE_USER = 'UPDATE_USER';

// Action Creators
export const setUser = (user) => ({
    type: SET_USER,
    payload: user,
});

export const clearUser = () => ({
    type: CLEAR_USER,
});

export const updateUser = (user) => ({
    type: UPDATE_USER,
    payload: user,
});