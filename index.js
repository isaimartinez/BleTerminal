import React from 'react';
import {AppRegistry} from 'react-native';
import App from './App/router';
import {name as appName} from './app.json';
import { Provider } from 'react-redux'
import {store} from './App/redux/store'


const BleApp = () =>
  <Provider store={store}>
    <App/>
  </Provider>
AppRegistry.registerComponent(appName, () => BleApp);

