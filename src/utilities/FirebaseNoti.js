import React, {Component} from 'react';
import {Alert, View} from 'react-native';
import firebase from 'react-native-firebase';
import AsyncStorage from '@react-native-community/async-storage';

class FirebaseNoti extends Component {

    constructor(props) {
        super(props);
    }

    async componentDidMount() {
        console.log('componentDidMount');
        this.checkPermission();
        this.createNotificationListeners();
    }

    //Remove listeners allocated in createNotificationListeners()
    componentWillUnmount() {
        this.notificationListener();
        this.notificationOpenedListener();
        this.notificationDisplayedListener();
    }

    //1
    async checkPermission() {
        console.log('checkPermission');
        const enabled = await firebase.messaging().hasPermission();
        if (enabled) {
            this.getToken();
        } else {
            this.requestPermission();
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

    //3
    async getToken() {
        let fcmToken = await AsyncStorage.getItem('fcmToken');
        console.log('Device token:', fcmToken);
        if (!fcmToken) {
            fcmToken = await firebase.messaging().getToken();
            console.log('Device token1:', fcmToken);
            if (fcmToken) {
                await AsyncStorage.setItem('fcmToken', fcmToken);
            }
        }
    }

    ////////////////////// Add these methods //////////////////////
    async createNotificationListeners() {
        const channel = new firebase.notifications.Android.Channel('test-channel', 'Test Channel', firebase.notifications.Android.Importance.Max)
            .setDescription('My apps test channel');
        console.log('my chanel id = ', channel);
        firebase.notifications().android.createChannel(channel);

        /*
        * Triggered when a particular notification has been received in foreground
        * */
        this.notificationListener = firebase.notifications().onNotification((notification) => {
            console.log('onNotification:', notification);
            const {_title, _body} = notification;
            this.hanldeNotification(_title, _body);

            notification
                .android.setChannelId('test-channel')
                .android.setSmallIcon('ic_launcher');
            firebase.notifications()
                .displayNotification(notification);
        });

        /*
        * If your app is in background, you can listen for when a notification is clicked / tapped / opened as follows:
        * */
        this.notificationOpenedListener = firebase.notifications().onNotificationOpened((notificationOpen) => {
            console.log('onNotificationOpened:', notificationOpen);
            const {_title, _body} = notificationOpen.notification;
            if (notificationOpen.action !== 'android.intent.action.MAIN') {
                this.hanldeNotification(_title, _body);
                firebase
                    .notifications()
                    .removeDeliveredNotification(notificationOpen.notification.notificationId);
                console.log('notificationId:', notificationOpen.notification.notificationId);
            }

        });

        /*
        * If your app is closed, you can check if it was opened by a notification being clicked / tapped / opened as follows:
        * */
        const notificationOpen = await firebase.notifications().getInitialNotification();
        console.log('getInitialNotification:', notificationOpen.notification.notificationId);
        if (notificationOpen && notificationOpen.action !== 'android.intent.action.MAIN') {
            const {_title, _body} = notificationOpen.notification;
            this.hanldeNotification(_title, _body);
        }

        /*
        * Triggered for data only payload in foreground
        * */
        this.messageListener = firebase.messaging().onMessage((message) => {
            //process data message
            console.log(JSON.stringify(message));
        });

        this.notificationDisplayedListener = firebase
            .notifications()
            .onNotificationDisplayed(noti => {
                // Process your notification as required
                // ANDROID: Remote notifications do not contain the channel ID.
                // You will have to specify this manually if you'd like to
                // re-display the notification.
            });
    }

    hanldeNotification = (title, body) => {
        console.log(`Notification =>title: ${title},  body: ${body}`);
        const param = {
            title: title,
            body: body
        }
        Alert.alert(
            title, body,
            [
                {
                    text: 'OK', onPress: () => {
                        this.props.navigation.navigate('Notification', param);
                    },
                },
            ],
            {cancelable: false},
        );
    };

    render() {
        return <View/>;
    }
}
export default FirebaseNoti;
// const mapStateToProps = (state) => {
//     console.log('firebase store:', state.nav);
//     return {
//         navigation: state.nav
//     }
// }
//
// const mapDispatchToProps = (dispatch) => {
//     return {
//
//     };
// };
//
// export default connect(mapStateToProps, mapDispatchToProps)(FirebaseNoti);
