import {put,takeLatest} from 'redux-saga/effects'
import {SIGNUP,SIGNUP_FAILED,SIGNUP_SUCCESS} from '../actions/actionTypes'
import {Api} from './Api'

function* signUpAction(action) {
    try {
        console.log("param "+JSON.stringify(action));
        const response = yield Api.signupApi(action.params);
        if(response.result === '1') {
            action.onSuccess(response);
            yield put({type:SIGNUP_SUCCESS,response})
        } else {
            action.onError(response);
            yield put({type:SIGNUP_FAILED,response})
        }
    } catch (e) {
        yield put({type:SIGNUP_FAILED,response : e})
    }
}

export function* watchSignUpAction() {
    yield takeLatest(SIGNUP,signUpAction)
}
