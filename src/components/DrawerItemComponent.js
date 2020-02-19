import React, {Component} from 'react';
import {
    View,
    TouchableOpacity,
    Text,
    ListView,
    Image,
    StyleSheet, Alert,
} from 'react-native';
import * as Constants from '../utilities/constants';
import * as SharedPreference from '../utilities/storages'

const _onPressLogout = (navigation) => {
    Alert.alert(
        "Confirm",
        "Are you sure that you want to logout?",
        [
            {
                text: "No",
                onPress: () => {
                    console.log("No, continue editing")
                }
            },
            {
                text: "Yes",
                onPress: () => {
                    console.log("Yes, discard changes")
                    SharedPreference.clearAllData().then(r => navigation.navigate('Login'))
                },
                style: "cancel"
            }
        ],
        { cancelable: false }
    );
}

const DrawerItem = ({navigation, icon, name, screenName}) =>
    <TouchableOpacity
        style={styles.menuItem}
        onPress={() => {
            //check logout
            if (name === 'Log out') {
                _onPressLogout(navigation)
            } else {
                navigation.navigate(`${screenName}`, {isStatusBarHidden: false});
            }
        }}>
        {/*<Icon name ='caretup' size={25} color="#333" style={{margin:15}} />*/}
        <Image source={{uri: 'https://img.icons8.com/2266EE/email'}} style={{width: 25, height: 25, margin: 12}}/>
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
