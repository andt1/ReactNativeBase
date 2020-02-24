import React from 'react';
import {Alert} from 'react-native';
import LoginScreen from '../../screens/login/index';
import {loginAction} from './actions';
import {connect} from 'react-redux';
import {isEmptyObject} from '../../utilities/utils';
import * as SharedPreference from '../../utilities/storages';
import * as Validates from '../../utilities/Validates';
import CheckPermission from '../../utilities/CheckPermission'

class LoginContainer extends React.Component {
    static navigationOptions = {
        title: 'Login',
        headerLeft: null,
    };

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            isLoading: false,
        };
        this.goToLogin = this.goToLogin.bind(this);
        this.goToSignup = this.goToSignup.bind(this);
        this._onChangeText = this._onChangeText.bind(this);
        this.TestClick = this.TestClick.bind(this);
        this.TestClickHome = this.TestClickHome.bind(this);
    }

    render() {
        return (
            <LoginScreen
                state={this.state}
                goToLogin = {this.goToLogin}
                goToSignup = {this.goToSignup}
                _onChangeText = {this._onChangeText}
                TestClick = {this.TestClick}
                TestClickHome = {this.TestClickHome}
                {...this.props}/>
        );
    }

    async componentWillMount(): void {
        await new CheckPermission();
    }

    goToLogin = async () => {
        this.setState({isLoading: true});
        const {
            email,
            password,
        } = this.state;
        console.log('email = ' + email);
        console.log('password = ' + password);
        const paramLogin = {
            email: email,
            password: password,
        };
        const isEmail = Validates.isValidateEmail(email);
        if (!isEmail) {
            console.log('Email is not correct');
            alert('Email is not correct');
            return;
        }
        console.log('Email is correct');
        await this.props.onLogin(paramLogin, this.onSuccess, this.onError);
    };

    onSuccess = async (data) => {
        this.setState({isLoading: false});
        if (!isEmptyObject(data)) {
            console.log(data);
            const userInfo = {
                token: data.token,
                id: data.data.id,
                name: data.data.name,
                email: data.data.email,
            };
            await SharedPreference.saveUserInfo(userInfo);
            this.setState({email: ''});
            this.setState({password: ''});
            this.props.navigation.navigate('Main');
        } else {
            Alert.alert('Alert', 'Login khong thanh cong');
            console.log('data is empty');
        }
    };

    onError = (error) => {
        console.log(error);
        Alert.alert('Alert', 'Login loi');
        this.setState({isError: true, isLoading: false});
    };

    goToSignup = async () => {
        this.props.navigation.navigate('Signup');
    };

    _onChangeText = (value, type) => {
        if (type === 'Email') {
            this.setState({email: value});
        }
        if (type === 'Password') {
            this.setState({password: value});
        }
    };

    TestClick = async () => {
        Alert.alert("Vai dai","click menu");
    };

    TestClickHome = async () => {
        Alert.alert("Vai dai","click home");
    };

}

const mapStateToProps = state => ({
    data: state.loginReducers.item,
    isLoading: state.loginReducers.isLoading,
    error: state.loginReducers.error,
});

const mapDispatchToProps = dispatch => ({
    onLogin: (params, onSuccess, onError) => {
        dispatch(loginAction(params, onSuccess, onError));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer);
