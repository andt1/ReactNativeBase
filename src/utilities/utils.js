import moment from 'moment';
import {Dimensions} from 'react-native';

const { width, height } = Dimensions.get('window');
export const generateTime = () => moment().format('YYYY-MM-DD HH:mm:ss');

const getNestedValue = (obj, key) => key.split('.').reduce((result, key) => result[key], obj);

export const sortByProps = (props, reverse = false) => {
    // eslint-disable-next-line no-param-reassign
    reverse = !reverse ? 1 : -1;
    return (a, b) => {
        // eslint-disable-next-line no-param-reassign
        a = getNestedValue(a, props);
        // eslint-disable-next-line no-param-reassign
        b = getNestedValue(b, props);
        // eslint-disable-next-line no-nested-ternary
        return a > b ? reverse * 1 : b > a ? reverse * -1 : 0;
    };
};

export const isEmptyObject = obj => !Object.keys(obj).length > 0;
export const formatNumber = (num) => {
    if (typeof num === 'number' || num !== null) {
        return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
    }
    return num;
};

export const betweenDate = (startDate, stopDate) => {
    const dateArray = [];
    let currentDate = moment(startDate);
    const endDate = moment(stopDate);
    while (currentDate <= endDate) {
        dateArray.push(moment(currentDate).format('YYYY-MM-DD'));
        currentDate = moment(currentDate).add(1, 'days');
    }
    return dateArray;
};

export const getWeekDay = (start, end, day) => {
    const startDate = moment(start);
    const endDate = moment(end);
    const result = [];
    const current = startDate.clone();
    while (current.day(7 + day).isBefore(endDate)) {
        result.push(current.clone());
    }
    return result.map(m => m.format('YYYY-MM-DD'));
};

export const errorCommon = (StatusCode) => {
    console.log(`StatusCode: ${StatusCode}`);
    if (StatusCode === 40013 || StatusCode === 40009 || StatusCode === 40012 || StatusCode === 40014) {
        return true;
    }
    return false;
};

export const getHeightPhoto = async (widthConfig) => {
    const rateScreen = width / height;
    return widthConfig + (widthConfig * rateScreen);
};

export const isArrayEmpty = async (array) => {
    if (array && array.length) {
        return true;
    }
    return false;
};

/** this convert distance from metter */
export const calcDistance = async (distance) => {
    let val;
    if (distance < 100) {
        val = `${distance} m`;
    } else {
        val = `${(distance / 1000).toFixed(2)} km`;
    }
    return val;
};
