import {View, Text, Image, TextInput, TouchableHighlight} from 'react-native';
import React from 'react';
import styles from './styles'
import Loading from '../loading/Loading'

export default class login extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={styles.container}>
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
        );
    }

};
