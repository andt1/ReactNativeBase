import React, { Component } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

class PiedPiperContainer extends Component {
  static navigationOptions = ({ navigation, screenProps }) => ({
    drawerLabel: "Pied Piper",
    title: "Pied Piper",
    headerLeft: (
      <View style={{ paddingHorizontal: 10 }}>
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          {/*<Icon name="menu" size={30} color="blue" />*/}
          <Image source={require("../assets/img/hooli.png")} style={{width:30,height:30}} />
        </TouchableOpacity>
      </View>
    )
  });
  render() {
    return (
      <View style={styles.container}>
        <Image source={require("../assets/img/piedpiper.png")} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});

PiedPiperContainer.defaultProps = {};

PiedPiperContainer.propTypes = {};

export default PiedPiperContainer;
