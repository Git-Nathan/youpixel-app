import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {StatusBar} from 'react-native';
import 'react-native-gesture-handler';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import HomeIcon from './src/assets/icons/home.svg';
import SubscriptionsIcon from './src/assets/icons/subscriptions.svg';
import TrendingIcon from './src/assets/icons/trending.svg';
import UserIcon from './src/assets/icons/user-octagon.svg';
import {Header} from './src/components/header';
import {screenRoutes} from './src/constants';
import {HomeStack} from './src/stacks/homeStack';
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
    <SafeAreaProvider>
      <NavigationContainer theme={MyTheme}>
        <StatusBar backgroundColor={globalStyles.backgroundColor} />
        <Tab.Navigator
          screenOptions={{
            tabBarStyle: {
              backgroundColor: globalStyles.backgroundColor,
              borderTopWidth: 1,
              borderTopColor: '#2c2c2c',
            },
            tabBarActiveTintColor: globalStyles.primaryColor,
            tabBarInactiveTintColor: 'white',
            header: props => <Header {...props} />,
          }}>
          <Tab.Screen
            name={screenRoutes.home.index}
            component={HomeStack}
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
            component={HomeStack}
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
            component={HomeStack}
            options={{
              tabBarLabel: 'Subscriptions',
              tabBarIcon: ({focused}) => {
                return (
                  <SubscriptionsIcon
                    color={focused ? globalStyles.primaryColor : 'white'}
                    height="24px"
                  />
                );
              },
            }}
          />
          <Tab.Screen
            name={screenRoutes.account.index}
            component={HomeStack}
            options={{
              tabBarLabel: 'Login',
              tabBarIcon: ({focused}) => {
                return (
                  <UserIcon
                    color={focused ? globalStyles.primaryColor : 'white'}
                    height="24px"
                  />
                );
              },
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default App;
