import {
    LOGIN, LOGIN_SUCCEEDED, LOGIN_FAILED, ERROR_NETWORK, LOGOUT_SUCCEEDED
} from '../actions/actionTypes';

const initialState = {
    item : {},
    isLoading : false,
    error : false
};

const loginReducers = (state = initialState,action) => {
    switch (action.type) {
        case LOGIN :
            return {
                ...state,
                isLoading: true,
                error : false
            };
        case LOGIN_SUCCEEDED:
            return {
                ...state,
                isLoading: false,
                items: action.response,
                error: false
            };
        case LOGIN_FAILED:
            return {
                ...state,
                isLoading: false,
                items: action.response,
                error: true
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

export default loginReducers;
