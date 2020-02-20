import React, {Component} from 'react';
import {Alert, View} from 'react-native';
import firebase from 'react-native-firebase';
import AsyncStorage from '@react-native-community/async-storage';
import {Button} from 'react-native-elements';
import {withNavigation} from 'react-navigation';

class FirebaseNoti extends Component {

    constructor(props) {
        super(props);
    }

    async componentDidMount() {
        console.log('componentDidMount')
        this.checkPermission();
        this.createNotificationListeners();
    }

    //1
    async checkPermission() {
        console.log('checkPermission')

        const enabled = await firebase.messaging().hasPermission();
        if (enabled) {
            this.getToken();
        } else {
            this.requestPermission();
        }
    }

    //3
    async getToken() {
        console.log('Device token')
        let fcmToken = await AsyncStorage.getItem('fcmToken');
        console.log('Device token:', fcmToken)
        if (!fcmToken) {
            fcmToken = await firebase.messaging().getToken();
            console.log('Device token1:', fcmToken)
            if (fcmToken) {
                // user has a device token
                await AsyncStorage.setItem('fcmToken', fcmToken);
            }
        }
    }

    //2
    async requestPermission() {
        try {
            await firebase.messaging().requestPermission();
            // User has authorised
            this.getToken();
        } catch (error) {
            // User has rejected permissions
            console.log('permission rejected');
        }
    }

    ////////////////////// Add these methods //////////////////////

    //Remove listeners allocated in createNotificationListeners()
    componentWillUnmount() {
        this.notificationListener();
        this.notificationOpenedListener();
    }

    async createNotificationListeners() {
        /*
        * Triggered when a particular notification has been received in foreground
        * */
        this.notificationListener = firebase.notifications().onNotification((notification) => {
            const {_title, _body} = notification;
            console.log("onNotification:", notification._title, notification._body)
            this.hanldeNotification(_title, _body);
        });

        /*
        * If your app is in background, you can listen for when a notification is clicked / tapped / opened as follows:
        * */
        this.notificationOpenedListener = firebase.notifications().onNotificationOpened((notificationOpen) => {
            const {_title, _body} = notificationOpen.notification;
            console.log("onNotificationOpened:", notificationOpen._title, notification._body)

            this.hanldeNotification(_title, _body);
        });

        /*
        * If your app is closed, you can check if it was opened by a notification being clicked / tapped / opened as follows:
        * */
        const notificationOpen = await firebase.notifications().getInitialNotification();
        if (notificationOpen) {
            const {_title, _body} = notificationOpen.notification;
            console.log("getInitialNotification:", notificationOpen._title, notification._body)
            this.hanldeNotification(_title, _body);
        }
        /*
        * Triggered for data only payload in foreground
        * */
        this.messageListener = firebase.messaging().onMessage((message) => {
            //process data message
            console.log(JSON.stringify(message));
        });
    }

    hanldeNotification = (title, body) => {
        console.log(`Notification =>title: ${title},  body: ${body}`);

        Alert.alert(
            title, body,
            [
                {
                    text: 'OK', onPress: () => {
                        this.props.navigation.navigate('Notification');
                    },
                },
            ],
            {cancelable: false},
        );
    };

    _onPressButton = () => {
        this.props.navigation.navigate('Notification');
    }

    render() {
        return <View style={{
            // backgroundColor: 'red',
            // flex: 1, justifyContent:'center'
        }}>
            {/*<Button*/}
            {/*    title="Notification"*/}
            {/*    type="outline"*/}
            {/*    onPress={this._onPressButton}*/}
            {/*/>*/}
        </View>;
    }
}

export default FirebaseNoti
