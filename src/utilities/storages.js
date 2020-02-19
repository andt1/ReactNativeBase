import AsyncStorage from '@react-native-community/async-storage'
import * as Constants from './constants'

export const saveUserInfo = async (value) => {
    try {
        // console.log('value', value)

        const value1 = JSON.stringify(value);
        console.log('value1', value1)
        await AsyncStorage.setItem(`@${Constants.USER_INFO}:key`,`${value1}`);
        return true;
    } catch (e) {
        return '';
    }
};


export const retrieveData = async () => {
    let user = '';
    try {
        user = await AsyncStorage.getItem(`@${Constants.USER_INFO}:key`);
    } catch (error) {
        // Error retrieving data
        console.log(error)
    }
    return user;
};

export const clearAllData = async () => {
    let result = await AsyncStorage.getAllKeys().then( keys => {
        AsyncStorage.multiRemove(keys)
    }).then(() => {
        console.log('clearAllData success')
    })
    return result;
};
