import React from 'react';
import {
    View,
    TouchableOpacity,
} from 'react-native';
import {RNCamera} from 'react-native-camera';

export default class CameraCustom extends React.Component {
    state = {
        flash: 'off',
        zoom: 0,
        autoFocus: 'on',
        type: 'back',//front
        ratio: '1:1',
    };

    takePicture = async function () {
        if (this.camera) {
            const data = await this.camera.takePictureAsync();
            console.warn('takePicture ', data);
            this.props.navigation.navigate('PhotoView', {dataImage: data});
        }
    };

    renderCamera() {
        return (
            <RNCamera
                ref={ref => {
                    this.camera = ref;
                }}
                style={{
                    flex: 1,
                }}
                type={this.state.type}
                flashMode={this.state.flash}
                autoFocus={this.state.autoFocus}
                zoom={this.state.zoom}
                ratio={this.state.ratio}
                androidCameraPermissionOptions={{
                    title: 'Permission to use camera',
                    message: 'We need your permission to use your camera',
                    buttonPositive: 'Ok',
                    buttonNegative: 'Cancel',
                }}
                androidRecordAudioPermissionOptions={{
                    title: 'Permission to use audio recording',
                    message: 'We need your permission to use your audio',
                    buttonPositive: 'Ok',
                    buttonNegative: 'Cancel',
                }}>

                <View style={{
                    bottom: 25,
                    width: '100%',
                    position: 'absolute',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                    <TouchableOpacity
                        style={{
                            backgroundColor: 'rgba(0,0,0,0.5)',
                            height: 70,
                            width: 70,
                            borderRadius: 35,
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderWidth: 5,
                            borderColor: 'white',
                        }}
                        onPress={this.takePicture.bind(this)}/>
                </View>
            </RNCamera>
        );
    }

    render() {
        return <View style={{
            flex: 1,
            paddingTop: 10,
            backgroundColor: '#000',
        }}>{this.renderCamera()}</View>;
    }
}
