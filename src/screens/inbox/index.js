import * as React from 'react';
import {Button, Text, View} from 'react-native';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator, TransitionPresets} from 'react-navigation-stack';

//demo screen transition
class HomeScreen extends React.Component {
    static navigationOptions = {
        title: 'Home',
    };

    render() {
        return (
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                <Text>Home Screen</Text>
                <Button
                    title="Go to Details"
                    onPress={() => this.props.navigation.navigate('Details')}
                />
            </View>
        );
    }
}

class DetailsScreen extends React.Component {

    static navigationOptions = {
        title: 'Profile',
    };

    render() {
        return (
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'red'}}>
                <Text>Details Screen</Text>
                <Button
                    title="Go to back"
                    onPress={() => this.props.navigation.goBack()}
                />
            </View>
        );
    }
}

const RootStack = createStackNavigator(
    {
        Home: HomeScreen,
        Details: DetailsScreen,
    },
    {
        initialRouteName: 'Home',
        mode: 'card',
        headerMode:'none',

        //config transition style
        defaultNavigationOptions: {
            ...TransitionPresets.SlideFromRightIOS,
        },
    },
);

const AppContainer = createAppContainer(RootStack);

export default class InboxScreen extends React.Component {
    render() {
        return <AppContainer/>;
    }
}
