import {put,takeLatest} from 'redux-saga/effects'
import {NavigationAction} from 'react-navigation'
import {
    LOGIN, LOGIN_SUCCEEDED, LOGIN_FAILED, ERROR_NETWORK, LOGOUT, LOGOUT_SUCCEEDED
} from '../actions/actionTypes';

import {Api} from './Api'

function* loginAction(action) {
    try {
        const response = yield Api.loginApi(action.params);
        console.log("response.status = "+response.status);
        if(response.result === '1') {
            action.onSuccess(response);
            yield put({type : LOGIN_SUCCEEDED,response});
        } else {
            action.onError(response);
            yield put({type : LOGIN_FAILED,response});
        }
    } catch (e) {
        yield put({type : ERROR_NETWORK,response : e});
    }
}

export function* watchLogin() {
    yield takeLatest(LOGIN,loginAction);
}
