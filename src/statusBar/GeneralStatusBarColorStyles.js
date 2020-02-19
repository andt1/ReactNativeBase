import { StyleSheet, Platform, StatusBar } from 'react-native';
import DeviceInfo from 'react-native-device-info';
import { getStatusBarHeight } from 'react-native-status-bar-height';

const ModelIphoneX = 'iPhone X';
const StatusBarHeightIos = DeviceInfo.getModel() === ModelIphoneX ? getStatusBarHeight(true) : 20;
const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? StatusBarHeightIos : StatusBar.currentHeight;
export default StyleSheet.create({
    statusBar: {
        height: STATUSBAR_HEIGHT
    }
});
