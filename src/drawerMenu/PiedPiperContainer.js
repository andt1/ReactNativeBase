import React, {Component} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View, Platform} from 'react-native';
import {Button} from 'react-native-elements';
// import {NativeModules, NativeEventEmitter} from 'react-native';
import Counter from '../modules/Counter';

class PiedPiperContainer extends Component {
    static navigationOptions = ({navigation, screenProps}) => ({
        drawerLabel: 'Pied Piper',
        title: 'Pied Piper',
        headerLeft: (
            <View style={{paddingHorizontal: 10}}>
                <TouchableOpacity onPress={() => navigation.openDrawer()}>
                    {/*<Icon name="menu" size={30} color="blue" />*/}
                    <Image source={require('../assets/img/hooli.png')} style={{width: 30, height: 30}}/>
                </TouchableOpacity>
            </View>
        ),
    });

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
