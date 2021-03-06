import React, { Component } from 'react'
import {
  View,
  TouchableOpacity,
  Text,
  ListView,
  Image,
  StyleSheet
} from 'react-native'

const DrawerItem = ({ navigation, icon, name, screenName }) =>
  <TouchableOpacity
    style={styles.menuItem}
    onPress={() =>
      navigation.navigate(`${screenName}`, { isStatusBarHidden: false })}>
    {/*<Icon name ='caretup' size={25} color="#333" style={{margin:15}} />*/}
    <Image source={{uri:'https://img.icons8.com/2266EE/email'}} style={{width:25,height:25,margin:12}}/>
    <Text style={styles.menuItemText}>{name}</Text>
  </TouchableOpacity>;


const styles = StyleSheet.create({
  menuItem: {
    flexDirection:'row'
  },
  menuItemText: {
    fontSize:15,
    fontWeight:'300',
    margin:15,
  }
});

export default DrawerItem
