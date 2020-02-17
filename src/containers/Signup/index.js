import React from 'react'
import SignupScreen from '../../screens/singup/index'
import {signupAction} from './actions'
import {connect} from 'react-redux'
import {isEmptyObject} from '../../utilities/utils';
import {Alert,BackHandler} from 'react-native';

class SignupContainer extends React.Component {

    static navigationOptions = {
        title: 'Signup',
    };

    constructor(props) {
        super(props);
        this.state = {
            name : '',
            email : '',
            password : '',
            isLoading : false
        };
        this._onChangeText = this._onChangeText.bind(this);
        this.Signup = this.Signup.bind(this);
    }

    render() {
        return (
            <SignupScreen
                state = {this.state}
                Signup = {this.Signup}
                _onChangeText = {this._onChangeText}
                {...this.props}/>
        );
    }

    Signup = async () => {
        this.setState({isLoading : true});
        const {
            name,
            email,
            password
        } = this.state;
        const paramSignup = {
            name : name,
            email : email,
            password : password
        };
        await this.props.signupAction(paramSignup,this.onSuccess,this.onError);
    };

    _onChangeText = (value,type) => {
        if(type === 'Email') {
            this.setState({email : value})
        }
        if(type === 'Name') {
            this.setState({name : value})
        }
        if(type === 'Password') {
            this.setState({password : value})
        }
    };

    onSuccess = async (data) => {
        this.setState({isLoading : false});
        if(!isEmptyObject(data)) {
            console.log(data);
            setTimeout(() => Alert.alert("Alert", "Dang ky thanh cong"), 10);
        } else {
            console.log(data);
        }
    };

    onError = (error) => {
        console.log(error);
        Alert.alert("Alert", "Login loi");
        this.setState({isLoading : false})
    };

    componentDidMount() {
        this.backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
            this.props.navigation.navigate('Login');
            return true;
        });
    }

    componentWillUnmount() {
        this.backHandler.remove();
    }

}

const mapStateToProps = state => ({
    data : state.signupReducers.item,
    isLoading: state.signupReducers.isLoading,
    error : state.signupReducers.error
});

const mapDispatchToProps = dispatch => ({
    signupAction : (param,onSuccess,onError) => {
       dispatch(signupAction(param,onSuccess,onError));
   }
});

export default connect(mapStateToProps,mapDispatchToProps)(SignupContainer)

