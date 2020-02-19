import React, {Component} from 'react';
import {
    View,
    TouchableOpacity,
    Text,
    ListView,
    Image,
    StyleSheet
} from 'react-native';
import * as Constants from '../utilities/constants';
import * as SharedPreference from '../utilities/storages'
import IonIcon from 'react-native-vector-icons/dist/MaterialIcons'

const DrawerItem = ({navigation, icon, name, screenName}) =>
    <TouchableOpacity
        style={styles.menuItem}
        onPress={() => {
            //check logout
            if (name === 'Log out') {
                SharedPreference.clearAllData()
                navigation.navigate('Login');
            } else {
                navigation.navigate(`${screenName}`, {isStatusBarHidden: false});
            }
        }}>
        <IonIcon name={icon} size={25} color="#333" style={{margin:15}}/>
        <Text style={styles.menuItemText}>{name}</Text>
    </TouchableOpacity>;


const styles = StyleSheet.create({
    menuItem: {
        flexDirection: 'row',
    },
    menuItemText: {
        fontSize: 15,
        fontWeight: '300',
        margin: 15,
    },
});

export default DrawerItem;
