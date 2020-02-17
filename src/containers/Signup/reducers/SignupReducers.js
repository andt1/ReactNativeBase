import {SIGNUP, SIGNUP_SUCCESS, SIGNUP_FAILED, ERROR_NETWORK} from '../actions/actionTypes';

const initialState = {
    item: {},
    isLoading: false,
    error: false,
};

const signupReducers = (state = initialState, action) => {
    // console.log("state = "+JSON.stringify(state));
    // console.log("action = "+JSON.stringify(action));
    // console.log("action.type = "+action.type);
    // console.log("action.response = "+action.response);
    switch (action.type) {
        case SIGNUP:
            return {
                ...state,
                isLoading: true,
                error: false,
            };
        case SIGNUP_SUCCESS:
            return {
                ...state,
                isLoading: false,
                error: false,
                items: action.response
            };
        case SIGNUP_FAILED:
            return {
                ...state,
                isLoading: false,
                error: true,
                items: action.response
            };
        case ERROR_NETWORK:
            return {
                ...state,
                isLoading: false,
                error: true
            };
        default:
            return state;
    }
};

export default signupReducers;
