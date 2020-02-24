import {View, Text, Image, TextInput, TouchableHighlight} from 'react-native';
import React from 'react';
import styles from './styles'
import Loading from '../loading/Loading'
import { Header } from 'react-native-elements';
import IonIcon from 'react-native-vector-icons/dist/MaterialIcons'
import GeneralStatusBarColor from '../../statusBar/GeneralStatusBarColor'

export default class login extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={{flex:1}}>
                <GeneralStatusBarColor backgroundColor="#772ea2"
                                       barStyle="light-content"/>
                <View style={styles.container}>
                    <Header
                        statusBarProps={{ translucent: true }}
                        leftComponent={<IonIcon name='menu' size={28} color="#fff" onPress={this.props.TestClick}/>}
                        centerComponent={{
                            text: 'Login',
                            style: {
                                fontSize: 18,
                                fontWeight: 'bold',
                                color: 'white',
                            }
                        }}
                        containerStyle={{paddingTop:0,height: Platform.select({
                                android: 56,
                                default: 44,
                            }),}}
                        rightComponent={<IonIcon name='home' size={28} color="#fff" onPress={this.props.TestClickHome}/>}
                    />
                    <Image source={require('../../assets/login.jpg')} style={styles.backgroundImage}/>
                    <View style={styles.loginForm}>
                        <Loading {...this.props}/>
                        <View style={styles.inputContainer}>
                            <Image style={styles.inputIcon} source={{uri: 'https://img.icons8.com/2266EE/email'}}/>
                            <TextInput style={styles.inputs}
                                       placeholder="Email"
                                       keyboardType="email-address"
                                       underlineColorAndroid='transparent'
                                       autoCapitalize='none'
                                       onChangeText={(email) => this.props._onChangeText(email, 'Email')}/>
                        </View>
                        <View style={styles.inputContainer}>
                            <Image style={styles.inputIcon} source={{uri: 'https://img.icons8.com/2266EE/password'}}/>
                            <TextInput style={styles.inputs}
                                       placeholder="Password"
                                       secureTextEntry={true}
                                       underlineColorAndroid='transparent'
                                       onChangeText={(password) => this.props._onChangeText(password, 'Password')}/>
                        </View>
                        <TouchableHighlight style={[styles.buttonContainer, styles.loginButton]} onPress={this.props.goToLogin}>
                            <Text style={styles.loginText}>Login</Text>
                        </TouchableHighlight>
                        <TouchableHighlight style={[styles.buttonContainer,styles.loginButton]} onPress={this.props.goToSignup}>
                            <Text style={styles.loginText}>Register</Text>
                        </TouchableHighlight>
                    </View>
                </View>
            </View>
        );
    }

};
