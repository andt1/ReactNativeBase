import React, {Component} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View, Platform,Alert} from 'react-native';
import {Button} from 'react-native-elements';
// import {NativeModules, NativeEventEmitter} from 'react-native';
import Counter from '../modules/Counter';
import CheckPermission from '../utilities/CheckPermission';
import { Header } from 'react-native-elements';
import IonIcon from 'react-native-vector-icons/dist/MaterialIcons'
import GeneralStatusBarColor from '../statusBar/GeneralStatusBarColor'

class PiedPiperContainer extends Component {

    static navigationOptions = {
        header: null,
    };

    async componentWillMount(): void {
        const check = await new CheckPermission();
        if(check.hasCameraPermission) {
            Alert.alert("Permission","da co permission");
        } else {
            Alert.alert("Permission","chua co permission");
        }
    }

    constructor(props) {
        super(props);
        if (Platform.OS === 'ios') {
            Counter.addListener(
                'onIncrement',
                res => {
                    console.log('onIncrement Event: ', res);
                });
        }
    }

    _onPressConstantsToExport = () => {
        // console.log('native module');
        // console.log(NativeModules.Counter);
        if (Platform.OS === 'ios') {
            console.log('initialCount:', Counter.initialCount);
        }
    };

    _onPressNormalFunc = () => {
        // NativeModules.Counter.increment();
        if (Platform.OS === 'ios') {
            Counter.increment();
        }
    };

    _onPressCallbackFunc = () => {
        // NativeModules.Counter.getCount(value => {
        //     console.log('count is: ' + value);
        // });
        if (Platform.OS === 'ios') {
            Counter.getCount(value => {
                console.log('getCount: ' + value);
            });
        }
    };

    _onPressSwiffPromise = () => {
        // NativeModules.Counter.increment();
        // //c1
        // // function decrement() {
        // //     NativeModules.Counter.decrement()
        // //         .then(res => console.log('decrement', res))
        // //         .catch(e => console.log('decrement', e.message, e.code));
        // // }
        //
        // //c2
        // async function decrement() {
        //     try {
        //         const res = await NativeModules.Counter.decrement()
        //         console.log(res)
        //     } catch(e) {
        //         console.log(e.message, e.code)
        //     }
        // }
        // decrement();
        // decrement();
        if (Platform.OS === 'ios') {
            Counter.decrement();
        }
    };

    _onPressSwiftEventEmitter = () => {
        // const CounterEvent = new NativeEventEmitter(NativeModules.Counter)
        // CounterEvent.addListener('onIncrement', res => {
        //     console.log('onIncrement Event: ', res)
        // })
        // NativeModules.Counter.increment()
        if (Platform.OS === 'ios') {
            Counter.increment();
            Counter.decrement();
            Counter.decrement();
        }
    };

    render() {
        return (
            <View style={{flex:1}}>
                <GeneralStatusBarColor backgroundColor="#772ea2"
                                       barStyle="light-content"/>
                <Header
                    statusBarProps={{ translucent: true }}
                    leftComponent={<IonIcon name='menu' size={28} color="#fff" onPress={()=>this.props.navigation.openDrawer()}/>}
                    centerComponent={{
                        text: 'Pied Piper',
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
                />
                <View style={styles.container}>
                    <Image source={require('../assets/img/piedpiper.png')}/>
                    <Button
                        title="constantsToExport"
                        type="clear"
                        onPress={this._onPressConstantsToExport}
                    />
                    <Button
                        title="normal func"
                        type="clear"
                        onPress={this._onPressNormalFunc}
                    />

                    <Button
                        title="callback func"
                        type="clear"
                        onPress={this._onPressCallbackFunc}
                    />

                    <Button
                        title="Swift promise"
                        type="clear"
                        onPress={this._onPressSwiffPromise}
                    />

                    <Button
                        title="Swift Event Emitter"
                        type="clear"
                        onPress={this._onPressSwiftEventEmitter}
                    />
                </View>
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

PiedPiperContainer.defaultProps = {};

PiedPiperContainer.propTypes = {};

export default PiedPiperContainer;
