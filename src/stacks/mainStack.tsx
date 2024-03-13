import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeIcon from '../assets/icons/home.svg';
import SubscriptionsIcon from '../assets/icons/subscriptions.svg';
import TrendingIcon from '../assets/icons/trending.svg';
import UserIcon from '../assets/icons/user-octagon.svg';
import {AccountScreen} from '../screens/accountScreen';
import {VideosScreen} from '../screens/videosScreen';
import {globalStyles} from '../styles/globalStyles';
import {TrendingStack} from './trendingStack';
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
        headerShown: false,
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
        component={TrendingStack}
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
        component={AccountScreen}
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
