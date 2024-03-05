import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import * as React from 'react';
import HomeIcon from '../assets/icons/home.svg';
import SubscriptionsIcon from '../assets/icons/subscriptions.svg';
import TrendingIcon from '../assets/icons/trending.svg';
import UserIcon from '../assets/icons/user-octagon.svg';
import {Header} from '../components/header/header';
import {VideosScreen} from '../screens/videosScreen';
import {globalStyles} from '../styles/globalStyles';
import {VideosStack} from './videosStack';

const Tab = createBottomTabNavigator();

export interface IMainStackProps {}

export function MainStack(props: IMainStackProps) {
  return (
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
        name="home"
        component={VideosStack}
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
        name="trending"
        component={VideosScreen}
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
        name="subscriptions"
        component={VideosScreen}
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
        name="account"
        component={VideosScreen}
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
  );
}
