import React, {Component} from 'react';
import {Image, NativeModules, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Button} from 'react-native-elements';

const {ToastModule} = NativeModules;

// import Icon from "react-native-vector-icons/MaterialIcons";

class HooliContainer extends Component {
    static navigationOptions = ({navigation, screenProps}) => ({
        drawerLabel: 'Hooli',
        title: 'Hooli',
        headerLeft: (
            <View style={{paddingHorizontal: 10}}>
                <TouchableOpacity onPress={() => navigation.openDrawer()}>
                    {/*<Icon name="menu" size={30} color="blue" />*/}
                    <Image source={require('../assets/img/piedpiper.png')} style={{width: 30, height: 30}}/>
                </TouchableOpacity>
            </View>
        ),
    });

    _onPressShowToast = () => {
        ToastModule.showText('this is Android Toast', NativeModules.ToastModule.LENGTH_SHORT);
    };

    _onPressCallBack = () => {
        ToastModule.doCallbackTask(100, (name, email) => {
            ToastModule.showText(`name: ${name}  , email: ${email}`, NativeModules.ToastModule.LENGTH_SHORT);
        }, (error) => {
            ToastModule.showText(`Error: ${error}`, NativeModules.ToastModule.LENGTH_LONG);
        });

    };


    async _onPressPromise() {
        try {
            let result = await ToastModule.doPromiseTask(100)
            ToastModule.showText(`Error: ${JSON.stringify(result)}`, NativeModules.ToastModule.LENGTH_LONG);
        } catch (e) {
            ToastModule.showText(`Error: ${e}`, NativeModules.ToastModule.LENGTH_LONG);
        }
    }


    render() {
        return (
            <View style={styles.container}>
                <Image source={require('../assets/img/hooli.png')}/>
                <Button
                    title="Show Toast"
                    type="clear"
                    onPress={this._onPressShowToast}
                />
                <Button
                    title="CallBack Android"
                    type="clear"
                    onPress={this._onPressCallBack}
                />
                <Button
                    title="Promise Android"
                    type="clear"
                    onPress={this._onPressPromise}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

HooliContainer.defaultProps = {};

HooliContainer.propTypes = {};

export default HooliContainer;
