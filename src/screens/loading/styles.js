import { StyleSheet } from 'react-native';

const loadingStyles = StyleSheet.create({
    activityIndicatorWrapper: {
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        display: 'flex',
        height: 100,
        justifyContent: 'space-around',
        width: 100
    },
    modalBackground: {
        alignItems: 'center',
        backgroundColor: '#00000040',
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-around'
    }
});
export default loadingStyles;
