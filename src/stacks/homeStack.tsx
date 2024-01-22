import {createStackNavigator} from '@react-navigation/stack';
import * as React from 'react';
import {screenRoutes} from '../constants';
import videosScreen from '../screens/videosScreen';
import {WatchScreen} from '../screens/watchScreen';

const Stack = createStackNavigator();

export interface IHomeStackProps {}

export function HomeStack(props: IHomeStackProps) {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name={screenRoutes.home.videos} component={videosScreen} />
      <Stack.Screen name={screenRoutes.home.watch} component={WatchScreen} />
    </Stack.Navigator>
  );
}
