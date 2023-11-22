/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import React from 'react';

import {HomeScreen} from './src/screens/HomeScreen';
import {TrendingScreen} from './src/screens/TrendingScreen';

const Stack = createNativeStackNavigator();

function App(): JSX.Element {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="TrendingScreen" component={TrendingScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
