/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import Navigator, {middleware} from './src/navigation';

import {Root} from 'native-base';
import {createStore, applyMiddleware, compose} from 'redux';
import createSagaMiddleware from 'redux-saga';
import {Provider} from 'react-redux';
import rootSaga from './src/sagas/rootSagas';
import allReducers from './src/reducers/rootReducers';
import FirebaseNoti from './src/utilities/FirebaseNoti';

const sagaMiddleware = createSagaMiddleware();
console.disableYellowBox = true;
const store = createStore(allReducers, compose(applyMiddleware(middleware, sagaMiddleware)));
sagaMiddleware.run(rootSaga);

export default class App extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <Root>
                    <Navigator/>
                    {/*<FirebaseNoti/>*/}
                </Root>
            </Provider>
        );
    }
}
