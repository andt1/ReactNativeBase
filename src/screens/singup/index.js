import React from 'react'
import {View, Text, Image, TextInput, TouchableHighlight, Alert, StyleSheet} from 'react-native';
import { Button } from 'react-native-elements';
import styles from './styles';
import Loading from '../loading/Loading';

export default class Signup extends React.Component {

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
                        <Image style={styles.inputIcon} source={{uri: 'https://img.icons8.com/2266EE/name'}}/>
                        <TextInput style={styles.inputs}
                                   placeholder="Name"
                                   underlineColorAndroid='transparent'
                                   autoCapitalize='none'
                                   onChangeText={(name) => this.props._onChangeText(name,'Name')}/>
                    </View>
                    <View style={styles.inputContainer}>
                        <Image style={styles.inputIcon} source={{uri: 'https://img.icons8.com/2266EE/email'}}/>
                        <TextInput style={styles.inputs}
                                   placeholder="Email"
                                   keyboardType="email-address"
                                   underlineColorAndroid='transparent'
                                   autoCapitalize='none'
                                   onChangeText={(email) => this.props._onChangeText(email,'Email')}/>
                    </View>
                    <View style={styles.inputContainer}>
                        <Image style={styles.inputIcon} source={{uri: 'https://img.icons8.com/2266EE/password'}}/>
                        <TextInput style={styles.inputs}
                                   placeholder="Password"
                                   secureTextEntry={true}
                                   underlineColorAndroid='transparent'
                                   autoCapitalize='none'
                                   onChangeText={(password) => this.props._onChangeText(password,'Password')}/>
                    </View>
                    <Button title="Signup" type="clear" titleStyle={styles.loginText} containerStyle={[styles.buttonContainer, styles.loginButton]} onPress={this.props.Signup}/>
                </View>
            </View>
        );
    }

}
