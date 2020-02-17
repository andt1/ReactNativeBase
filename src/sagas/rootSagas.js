import {watchLogin} from '../containers/Login/sagas/loginSagas'
import {watchSignUpAction} from '../containers/Signup/sagas/signupSagas'
import {fork} from 'redux-saga/effects'

export default function* rootSaga() {
    yield fork(watchLogin);
    yield fork(watchSignUpAction);
}
