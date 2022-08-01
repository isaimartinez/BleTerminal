import React from 'react';
import {AppRegistry, LogBox} from 'react-native';
import Router from './App/router';
import {name as appName} from './app.json';
import { Provider } from 'react-redux'
import {store} from './App/redux/store'

// LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
// LogBox.ignoreLogs(['Possible Unhandled: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs();



const BleApp = () =>
  <Provider store={store}>
    <Router/>
  </Provider>
AppRegistry.registerComponent(appName, () => BleApp);

