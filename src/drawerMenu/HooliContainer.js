import React, {Component} from 'react';
import {Image, NativeModules, Platform, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Button} from 'react-native-elements';
import Counter from '../modules/Counter';

const {ToastModule} = NativeModules;

// import Icon from "react-native-vector-icons/MaterialIcons";

class HooliContainer extends Component {
    static navigationOptions = ({navigation, screenProps}) => ({
        drawerLabel: 'Hooli',
        title: 'Hooli',
        headerLeft: (
            <View style={{paddingHorizontal: 10}}>
                <TouchableOpacity onPress={() => navigation.navigate('DrawerOpen')}>
                    {/*<Icon name="menu" size={30} color="blue" />*/}
                    <Image source={require('../assets/img/piedpiper.png')} style={{width: 30, height: 30}}/>
                </TouchableOpacity>
            </View>
        ),
    });

    _onPressShowToast = () => {
        console.log('toast:', ToastModule);
        alert('this is Android Toast');
    };

    _onPressCallBack = () => {
        if (Platform.OS === 'ios') {
            ToastModule.doCallbackTask(result => {
                alert(`name: ${result}  , email: ${result}`);
            });
        } else {
            ToastModule.doCallbackTask(100, (name, email) => {
                alert(`name: ${name}  , email: ${email}`);
            }, (error) => {
                alert(`Error: ${error}`);
            });
        }
    };


    async _onPressPromise() {
        if (Platform.OS === 'ios') {
            // ToastModule.doPromiseTask(100)
            //     .then(res => console.log(res))
            //     .catch(e => console.log(e.message, e.code))
            try {
                let result = await ToastModule.doPromiseTask();
                alert(`Error: ${JSON.stringify(result)}`);
            } catch (e) {
                alert(`Error: ${e}`);
            }
        } else {
            try {
                let result = await ToastModule.doPromiseTask(100);
                alert(`Error: ${JSON.stringify(result)}`);
            } catch (e) {
                alert(`Error: ${e}`);
            }
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
