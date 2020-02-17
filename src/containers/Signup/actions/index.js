import {SIGNUP} from './actionTypes'

export const signupAction = (params,onSuccess,onError) => ({
   type: SIGNUP,
    params,
    onSuccess,
    onError
});
