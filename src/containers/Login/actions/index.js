import {
    LOGIN,
} from './actionTypes';

export const loginAction = (params,onSuccess,onError) => ({
   type : LOGIN,
    params,
    onSuccess,
    onError
});
