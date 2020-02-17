import AsyncStorage from '@react-native-community/async-storage'
import * as Constants from './constants'

export const saveUserInfo = async (value) => {
    try {
        const value = JSON.stringify(value);
        await AsyncStorage.setItem(`@${Constants.USER_INFO}:key`,`${value}`);
        return true;
    } catch (e) {
        return '';
    }
};
