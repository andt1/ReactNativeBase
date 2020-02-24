import React from 'react';
import {View,Image} from 'react-native';

function PhotoView ({navigation }) {

        const data = navigation.getParam('dataImage');

        return(
            <View>
                <Image
                    source={{uri:data.uri}}
                    style={{ width: 350, height: 350 }}
                />
            </View>
        )
}

export default PhotoView

