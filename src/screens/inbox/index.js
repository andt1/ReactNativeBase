import * as React from 'react';
import {Button, Text, View, BackHandler, Alert} from 'react-native';
import {createAppContainer, withNavigation} from 'react-navigation';
import {createStackNavigator, TransitionPresets} from 'react-navigation-stack';
import PermissionExample from './permissionExample';

//demo screen transition
class HomeScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: 'init name',
        };
    }

    static navigationOptions = {
        title: 'Home',
    };

    componentDidMount() {
        const {navigation} = this.props;
        this.focusListener = navigation.addListener('didFocus', () => {
            // The screen is focused
            // Call any action
            console.log('focussss scereennnnn');
        });
    }

    componentWillUnmount() {
        // Remove the event listener
        this.focusListener.remove();
    }


    returnData(name) {
        this.setState({name});
    }

    render() {
        return (
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                <Text>Home Screen {this.state.name}</Text>
                <Button
                    title="PermissionExample"
                    onPress={() => this.props.navigation.navigate('PermissionEx')}
                />
                <View style={{height: 5}}/>
                <Button
                    title="Go to Details"
                    onPress={() => this.props.navigation.navigate('Details', {
                        itemId: 69,
                        otherParam: 'anything data',
                        returnData: this.returnData.bind(this),
                    })}
                />
            </View>
        );
    }
}

class DetailsScreen extends React.Component {

    static navigationOptions = {
        title: 'Profile',
    };

    componentDidMount() {
        this.backHandler = BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
    }

    componentWillUnmount() {
        this.backHandler.remove();
    }

    handleBackPress = () => {
        this.exitAlert();
        return true;
    };

    exitAlert = () => {
        Alert.alert(
            'Confirm exit',
            'Do you want to quit the app?'
                [
                {text: 'CANCEL', style: 'cancel'},
                    {
                        text: 'OK', onPress: () =>
                            // BackHandler.exitApp()
                            this.goBack(), // works best when the goBack is async
                    }
                ],
        );
    };

    render() {

        const {navigation} = this.props;

        return (
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'red'}}>
                <Text>Details Screen</Text>
                <Text>ID: {JSON.stringify(navigation.getParam('itemId'))}</Text>
                <Text>Data: {JSON.stringify(navigation.getParam('otherParam', 'default value'))}</Text>
                <Button
                    title="Go to back"
                    onPress={() => {
                        navigation.state.params.returnData('this is return data \n' + new Date().toString());
                        navigation.goBack();
                    }
                    }
                />
                <Button
                    title="Go to Details... again"
                    onPress={() =>
                        navigation.push('Details', {
                            itemId: Math.floor(Math.random() * 100),
                        })
                    }
                />
            </View>
        );
    }
}

const RootStack = createStackNavigator(
    {
        Home: HomeScreen,
        Details: DetailsScreen,
        PermissionEx: PermissionExample,
    },
    {
        initialRouteName: 'Home',
        mode: 'card',
        headerMode: 'none',

        //config transition style
        defaultNavigationOptions: {
            ...TransitionPresets.SlideFromRightIOS,
            gestureEnabled: true,
        },
    },
);

const AppContainer = createAppContainer(RootStack);

export default class InboxScreen extends React.Component {
    render() {
        return <AppContainer/>;
    }
}
