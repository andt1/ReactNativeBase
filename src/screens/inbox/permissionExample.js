import React, {Component} from 'react';

import {check, openSettings, PERMISSIONS, request} from 'react-native-permissions';
import {Alert, Button, View} from 'react-native';

/*
https://github.com/react-native-community/react-native-permissions
1.Cài đặt thư viện:
install --save react-native-permissions
hoặc
yarn add react-native-permissions

2. Config cho ios

*) Bước 1:
Thêm dòng sau vào file 'Podfile' sau đó chạy lệnh 'pod install'

  permissions_path = '../node_modules/react-native-permissions/ios'
  pod 'Permission-BluetoothPeripheral', :path => "#{permissions_path}/BluetoothPeripheral.podspec"
  pod 'Permission-Calendars', :path => "#{permissions_path}/Calendars.podspec"
  pod 'Permission-Camera', :path => "#{permissions_path}/Camera.podspec"
  pod 'Permission-Contacts', :path => "#{permissions_path}/Contacts.podspec"
  pod 'Permission-FaceID', :path => "#{permissions_path}/FaceID.podspec"
  pod 'Permission-LocationAlways', :path => "#{permissions_path}/LocationAlways.podspec"
  pod 'Permission-LocationWhenInUse', :path => "#{permissions_path}/LocationWhenInUse.podspec"
  pod 'Permission-MediaLibrary', :path => "#{permissions_path}/MediaLibrary.podspec"
  pod 'Permission-Microphone', :path => "#{permissions_path}/Microphone.podspec"
  pod 'Permission-Motion', :path => "#{permissions_path}/Motion.podspec"
  pod 'Permission-Notifications', :path => "#{permissions_path}/Notifications.podspec"
  pod 'Permission-PhotoLibrary', :path => "#{permissions_path}/PhotoLibrary.podspec"
  pod 'Permission-Reminders', :path => "#{permissions_path}/Reminders.podspec"
  pod 'Permission-Siri', :path => "#{permissions_path}/Siri.podspec"
  pod 'Permission-SpeechRecognition', :path => "#{permissions_path}/SpeechRecognition.podspec"
  pod 'Permission-StoreKit', :path => "#{permissions_path}/StoreKit.podspec"

*) Bước 2:
Thêm dòng sau vào file 'Info.plist' đêr mô tả permission sử dụng

  <key>NSAppleMusicUsageDescription</key>
  <string>YOUR TEXT</string>
  <key>NSBluetoothAlwaysUsageDescription</key>
  <string>YOUR TEXT</string>
  <key>NSBluetoothPeripheralUsageDescription</key>
  <string>YOUR TEXT</string>
  <key>NSCalendarsUsageDescription</key>
  <string>YOUR TEXT</string>
  <key>NSCameraUsageDescription</key>
  <string>YOUR TEXT</string>
  <key>NSContactsUsageDescription</key>
  <string>YOUR TEXT</string>
  <key>NSFaceIDUsageDescription</key>
  <string>YOUR TEXT</string>
  <key>NSLocationAlwaysAndWhenInUseUsageDescription</key>
  <string>YOUR TEXT</string>
  <key>NSLocationAlwaysUsageDescription</key>
  <string>YOUR TEXT</string>
  <key>NSLocationWhenInUseUsageDescription</key>
  <string>YOUR TEXT</string>
  <key>NSMicrophoneUsageDescription</key>
  <string>YOUR TEXT</string>
  <key>NSMotionUsageDescription</key>
  <string>YOUR TEXT</string>
  <key>NSPhotoLibraryUsageDescription</key>
  <string>YOUR TEXT</string>
  <key>NSRemindersUsageDescription</key>
  <string>YOUR TEXT</string>
  <key>NSSpeechRecognitionUsageDescription</key>
  <string>YOUR TEXT</string>
  <key>NSSiriUsageDescription</key>
  <string>YOUR TEXT</string>

3. Config cho android
Thêm các dòng sau vào file 'android/app/src/main/AndroidManifest.xml'

  <uses-permission android:name="android.permission.ACCEPT_HANDOVER" />
  <uses-permission android:name="android.permission.ACCESS_BACKGROUND_LOCATION" />
  <uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION" />
  <uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />
  <uses-permission android:name="android.permission.ACTIVITY_RECOGNITION" />
  <uses-permission android:name="android.permission.ANSWER_PHONE_CALLS" />
  <uses-permission android:name="android.permission.BODY_SENSORS" />
  <uses-permission android:name="android.permission.CALL_PHONE" />
  <uses-permission android:name="android.permission.CAMERA" />
  <uses-permission android:name="android.permission.GET_ACCOUNTS" />
  <uses-permission android:name="android.permission.PROCESS_OUTGOING_CALLS" />
  <uses-permission android:name="android.permission.READ_CALENDAR" />
  <uses-permission android:name="android.permission.READ_CALL_LOG" />
  <uses-permission android:name="android.permission.READ_CONTACTS" />
  <uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE" />
  <uses-permission android:name="android.permission.READ_PHONE_NUMBERS" />
  <uses-permission android:name="android.permission.READ_PHONE_STATE" />
  <uses-permission android:name="android.permission.READ_SMS" />
  <uses-permission android:name="android.permission.RECEIVE_MMS" />
  <uses-permission android:name="android.permission.RECEIVE_SMS" />
  <uses-permission android:name="android.permission.RECEIVE_WAP_PUSH" />
  <uses-permission android:name="android.permission.RECORD_AUDIO" />
  <uses-permission android:name="android.permission.SEND_SMS" />
  <uses-permission android:name="android.permission.USE_SIP" />
  <uses-permission android:name="android.permission.WRITE_CALENDAR" />
  <uses-permission android:name="android.permission.WRITE_CALL_LOG" />
  <uses-permission android:name="android.permission.WRITE_CONTACTS" />
  <uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />
  <uses-permission android:name="com.android.voicemail.permission.ADD_VOICEMAIL" />


4.thực hiện check request permission theo ví dụ dưới đây
 */

const CAMERA_PERMISSION = Platform.OS === 'ios' ? PERMISSIONS.IOS.CAMERA : PERMISSIONS.ANDROID.CAMERA;
const AUDIO_PERMISSION = Platform.OS === 'ios' ? PERMISSIONS.IOS.MICROPHONE : PERMISSIONS.ANDROID.RECORD_AUDIO;

export default class PermissionExample extends Component {

    checkCameraPermission = () => {
        check(CAMERA_PERMISSION)
            .then((result) => {
                if (result === 'unavailable') {
                    console.log('This feature is not available (on this device / in this context)');
                    Alert.alert('', 'This feature is not available (on this device / in this context');
                } else if (result === 'denied') {
                    console.log('The permission has not been requested / is denied but requestable');
                    Alert.alert('', 'The permission has not been requested / is denied but requestable');
                } else if (result === 'granted') {
                    console.log('The permission is granted');
                    Alert.alert('', 'The permission is granted');
                } else if (result === 'blocked') {
                    console.log('The permission is denied and not requestable anymore');
                    Alert.alert('', 'The permission is denied and not requestable anymore');
                }
            })
            .catch(error => {
                console.log('Have error: ' + {error});
                Alert.alert('Have error: ' + {error});
            });
    };

    checkRequestCameraPermission = () => {
        check(CAMERA_PERMISSION)
            .then((result) => {
                if (result !== 'granted') {
                    this.requestCameraPermission().then((result) => {
                        if (result === 'granted') {
                            console.log('The permission is granted');
                            Alert.alert('Successful', 'The permission is granted');
                        } else if (result === 'blocked') {
                            console.log('The permission is denied and not requestable anymore');
                            this.gotoSettingPermissionAlert();
                        }
                    });
                } else if (result === 'granted') {
                    console.log('The permission is granted');
                    Alert.alert('Successful', 'The permission is granted');
                }
            })
            .catch(error => {
                console.log('Have error: ' + {error});
            });
    };

    gotoSettingPermissionAlert = () => {
        Alert.alert(
            'Confirm Setting', 'Do you want go to app setting permission?',
            [{text: 'CANCEL', style: 'cancel'}, {
                text: 'OK',
                onPress: () => openSettings().catch(() => console.warn('cannot open settings')),
            }],
        );
    };

    async requestCameraPermission() {
        return await request(CAMERA_PERMISSION);
    };


    //check & request multiples permissions
    checkRequestCameraAudioPermission = () => {
        Promise.all([
            check(AUDIO_PERMISSION),
            check(CAMERA_PERMISSION),
        ]).then(([microphoneStatus, cameraStatus]) => {
            console.log({microphoneStatus, cameraStatus});
            if (!(microphoneStatus === 'granted' && cameraStatus === 'granted')) {
                this.requestCameraAudioPermission()
                    .then((result) => {
                        if (result.microphoneStatus === 'granted' && result.cameraStatus === 'granted') {
                            console.log('The permission is granted');
                            Alert.alert('Successful', 'The permission is granted');
                        }
                    });
            } else if (microphoneStatus === 'granted' && cameraStatus === 'granted') {
                console.log('The permission is granted');
                Alert.alert('Successful', 'The permission is granted');
            }
        });
    };

    async requestCameraAudioPermission() {
        const microphoneStatus = await request(AUDIO_PERMISSION);
        const cameraStatus = await request(CAMERA_PERMISSION);
        return {cameraStatus, microphoneStatus};
    };

    render() {
        return (
            <View style={{alignItems: 'center', justifyContent: 'center', padding: 20}}>
                <Button onPress={this.checkCameraPermission} title={'Check Camera Permission'}/>
                <View style={{height: 5}}/>
                <Button onPress={this.checkRequestCameraPermission} title={'Check & Request Camera Permission'}/>
                <View style={{height: 5}}/>
                <Button onPress={this.checkRequestCameraAudioPermission}
                        title={'Check & Request Camera & Audio Permission'}/>
            </View>
        );
    }
}
