import React, { Component } from 'react';
import {
    View,
    Modal,
    ActivityIndicator
} from 'react-native';
import loadingStyles from './styles';

const Loading = (props) => {
    const {
        isLoading,
    } = props;

    return (
        <Modal
            transparent
            animationType="none"
            visible={isLoading}
            onRequestClose={() => { console.log('close modal'); }}
        >
            <View style={loadingStyles.modalBackground}>
                <View style={loadingStyles.activityIndicatorWrapper}>
                    <ActivityIndicator
                        size="large"
                        animating={isLoading}
                    />
                </View>
            </View>
        </Modal>
    );
};
export default Loading;
