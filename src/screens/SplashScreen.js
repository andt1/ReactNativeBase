import React from 'react';
import {View, Text, StyleSheet,Image} from 'react-native';

const styles = StyleSheet.create({
  container : {
    flex : 1
  },
  backgroundImage : {
    flex : 1,
    resizeMode : 'cover',
    width : '100%',
    height : '100%'
  }
});
export default class SplashScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  performTimeConsumingTask = async() => {
    return new Promise((resolve) =>
        setTimeout(
            () => { resolve('result') },
            3000
        )
    )
  };

  async componentDidMount() {
    const data = await this.performTimeConsumingTask();
    if (data !== null) {
      this.props.navigation.navigate('Login');
    }
  }


  render() {
    return (
      <View style={styles.container}>
        <Image source={require('../assets/splash.jpeg')} style = {styles.backgroundImage}/>
      </View>
    );
  }
}

