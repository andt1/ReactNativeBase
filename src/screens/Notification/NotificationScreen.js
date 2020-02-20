import React from 'react';
import {Image, Text, View} from 'react-native';
import styles from './styles';

export default class NotificationScreen extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        // const title = this.props.navigation.state.params.title;
        // const body = this.props.navigation.state.params.body;

        return (
            <View style={styles.container}>
                {/*<Text>Title: {title}</Text>*/}
                {/*<Text>Body: {body}</Text>*/}
            </View>
        );
    }


}
