import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {StatusBar} from 'react-native';
import HomeIcon from './src/assets/icons/home.svg';
import LibraryIcon from './src/assets/icons/library.svg';
import SubscriptionsIcon from './src/assets/icons/subscriptions.svg';
import TrendingIcon from './src/assets/icons/trending.svg';
import {Header} from './src/components/Header';
import {screenRoutes} from './src/constants';
import {HomeScreen} from './src/screens/HomeScreen';
import {LibraryScreen} from './src/screens/LibraryScreen';
import {SubscriptionsScreen} from './src/screens/SubscriptionsScreen';
import {TrendingScreen} from './src/screens/TrendingScreen';
import {globalStyles} from './src/styles/globalStyles';

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: globalStyles.primaryColor,
    background: globalStyles.backgroundColor,
    text: 'white',
  },
  dark: true,
};

const Tab = createBottomTabNavigator();

function App(): JSX.Element {
  return (
    <NavigationContainer theme={MyTheme}>
      <StatusBar backgroundColor={globalStyles.backgroundColor} />
      <Tab.Navigator
        screenOptions={{
          tabBarStyle: {
            backgroundColor: globalStyles.backgroundColor,
            borderTopWidth: 1,
          },
          tabBarActiveTintColor: globalStyles.primaryColor,
          tabBarInactiveTintColor: 'white',
          header: props => <Header {...props} />,
        }}>
        <Tab.Screen
          name={screenRoutes.home.index}
          component={HomeScreen}
          options={{
            tabBarLabel: 'Home',
            tabBarIcon: ({focused}) => {
              return (
                <HomeIcon
                  color={focused ? globalStyles.primaryColor : 'white'}
                  height="22px"
                />
              );
            },
          }}
        />
        <Tab.Screen
          name={screenRoutes.trending.index}
          component={TrendingScreen}
          options={{
            tabBarLabel: 'Trending',
            tabBarIcon: ({focused}) => {
              return (
                <TrendingIcon
                  color={focused ? globalStyles.primaryColor : 'white'}
                  height="22px"
                />
              );
            },
          }}
        />
        <Tab.Screen
          name={screenRoutes.subscriptions.index}
          component={SubscriptionsScreen}
          options={{
            tabBarLabel: 'Subscriptions',
            tabBarIcon: ({focused}) => {
              return (
                <SubscriptionsIcon
                  color={focused ? globalStyles.primaryColor : 'white'}
                  height="22px"
                />
              );
            },
          }}
        />
        <Tab.Screen
          name={screenRoutes.library.index}
          component={LibraryScreen}
          options={{
            tabBarLabel: 'Library',
            tabBarIcon: ({focused}) => {
              return (
                <LibraryIcon
                  color={focused ? globalStyles.primaryColor : 'white'}
                  height="22px"
                />
              );
            },
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default App;
