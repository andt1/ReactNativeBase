import React from 'react';
import {View, Image, TouchableOpacity, Text, Alert} from 'react-native';
import CameraRoll from '@react-native-community/cameraroll';

function PhotoView({navigation}) {

    const data = navigation.getParam('dataImage');

    return (
        <View>
            <Image
                source={{uri: data.uri}}
                style={{width: 350, height: 350}}
            />

            <TouchableOpacity style={{
                height: 50,
                alignSelf: 'center',
                marginTop: 20,
                backgroundColor: '#81d4fa',
                justifyContent: 'center',
                borderRadius: 10,
                padding: 10,
            }}
                              onPress={() => {
                                  CameraRoll.saveToCameraRoll(data.uri)
                                      .then(r => {
                                          console.log('successful uri', r);
                                          Alert.alert('', 'Save Image to storage: ' + r);
                                      })
                                      .catch((err) => {
                                          console.warn('error', err);
                                          Alert.alert('', 'Error: ' + err);
                                      });

                              }}>
                <Text>Save Image</Text>
            </TouchableOpacity>
        </View>
    );
}

export default PhotoView;

