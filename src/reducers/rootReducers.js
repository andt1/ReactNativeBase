import { combineReducers } from 'redux';
import {
    createNavigationReducer,
} from 'react-navigation-redux-helpers';
import { AppNavigator } from '../navigation';
import loginReducers from '../containers/Login/reducers/loginReducers';
import signupReducers from '../containers/Signup/reducers/SignupReducers';

const navReducer = createNavigationReducer(AppNavigator);

const allReducers = combineReducers({
    nav: navReducer,
    loginReducers,
    signupReducers
});

export default allReducers;
