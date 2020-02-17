import React from 'react'
import {View,Text,Image,StyleSheet} from 'react-native'

class MainScreens extends React.Component {

    static navigationOptions = {
        drawerLabel: 'Home',
        drawerIcon: ({ tintColor }) => (
            <Image
                source={require('../../assets/menu_icon.png')}
                style={[styles.icon, { tintColor: tintColor }]}
            />
        ),
    };

    constructor(props) {
        super(props);
    }

    render() {
        return (
          <View>
              <Text>Main day roi</Text>
          </View>
        );
    }

}

const styles = StyleSheet.create({
    icon: {
        width: 24,
        height: 24,
    },
});

export default MainScreens;
