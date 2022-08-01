import React from 'react'
import { View, Text, StatusBar } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Scanner from './screens/Scanner';
import Terminal from './screens/Terminal';
import BleSwitchBtn from './components/BleSwitchBtn';

const Stack = createNativeStackNavigator();

const router = () => {
  return (
    <NavigationContainer>
      <StatusBar barStyle='dark-content'/>
      <Stack.Navigator initialRouteName="Scanner">
        <Stack.Screen name="Scanner" component={Scanner} />
        <Stack.Screen 
          name="Terminal" 
          component={Terminal} 
          options={({ navigation,route }) => ({ 
            title: route.params.device?.name, 
            headerRight: (props) => <BleSwitchBtn route={route}/>,
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default router