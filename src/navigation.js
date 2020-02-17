import React from 'react';
import {NavigationActions, createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {BackHandler} from 'react-native';
import SplashScreen from './screens/SplashScreen';
import LoginScreens from './containers/Login/index';
import Signup from './containers/Signup/index';
import MainScreens from './containers/Main/index';
import {createDrawerNavigator} from 'react-navigation-drawer';

import DrawerMenu from './drawerMenu/DrawerMenu'
import PiedPiperContainer from './drawerMenu/PiedPiperContainer';
import HooliContainer from './drawerMenu/HooliContainer';

import { TransitionSpecs } from 'react-navigation-stack';

import {
    createReactNavigationReduxMiddleware,
    createReduxContainer,
} from 'react-navigation-redux-helpers';

import {connect} from 'react-redux';

const MainScreenNavigator = createStackNavigator({
    PiedPiper: { screen: PiedPiperContainer },
    Hooli: { screen: HooliContainer }
});

export const AppNavigator = createDrawerNavigator({
    Splash: {
        screen: SplashScreen,
    },
    Login: {
        screen: LoginScreens,
    },
    Signup: {
        screen: Signup,
    },
    Main: {
        screen: MainScreenNavigator,
    },
}, {
    initialRouteName: 'Splash',
    contentComponent: DrawerMenu,
    mode: Platform.OS === "ios" ? "modal" : "card"
});

export const middleware = createReactNavigationReduxMiddleware(
    state => state.nav,
    'root',
);

const ReduxNavigator = createReduxContainer(AppNavigator, 'root');

const mapStateToProps = state => ({
    nav: state.nav,
});

class ReduxNavigation extends React.Component {
    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.onBackPress);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.onBackPress);
    }

    onBackPress = () => {
        const {nav, dispatch} = this.props;
        if (nav.alert === 0) {
            return false;
        }
        dispatch(NavigationActions.back());
        return true;
    };

    render() {
        const {nav, dispatch} = this.props;
        return (
            <ReduxNavigator state={nav} dispatch={dispatch}/>
        );
    }
}

export default connect(mapStateToProps)(ReduxNavigation);
