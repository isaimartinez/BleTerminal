import React from 'react'
import { View, Text } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Scanner from './screens/Scanner';
import Terminal from './screens/Terminal';

const Stack = createNativeStackNavigator();

const router = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Scanner">
        <Stack.Screen name="Scanner" component={Scanner} />
        <Stack.Screen name="Terminal" component={Terminal} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default router