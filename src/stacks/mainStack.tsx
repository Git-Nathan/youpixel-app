import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {observer} from 'mobx-react-lite';
import {useState} from 'react';
import {Image, Text, View} from 'react-native';
import HomeIcon from '../assets/icons/home.svg';
import SubscriptionsIcon from '../assets/icons/subscriptions.svg';
import TrendingIcon from '../assets/icons/trending.svg';
import UserIcon from '../assets/icons/user-octagon.svg';
import {accountStoreIntance} from '../auth/authProvider';
import {globalStyles} from '../styles/globalStyles';
import {AccountStack} from './accountStack';
import {SubscriptionStack} from './subscriptionStack';
import {TrendingStack} from './trendingStack';
import {VideosStack} from './videosStack';

const Tab = createBottomTabNavigator();

export interface IMainStackProps {}

export const MainStack = observer((props: IMainStackProps) => {
  const [accountStore] = useState(() => accountStoreIntance);

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
        component={SubscriptionStack}
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
      {accountStore.isSignedIn ? (
        <Tab.Screen
          name="account"
          component={AccountStack}
          options={{
            tabBarLabel: 'You',
            tabBarIcon: ({focused}) => {
              if (accountStore.currentUser?.picture) {
                return (
                  <View
                    className="overflow-hidden rounded-full border border-solid"
                    style={
                      focused
                        ? {
                            borderColor: globalStyles.primaryColor,
                          }
                        : {}
                    }>
                    <Image
                      className="h-[24px] w-[24px] "
                      source={{
                        uri: accountStore.currentUser?.picture,
                      }}
                    />
                  </View>
                );
              }

              return (
                <View
                  className="flex h-[24px] w-[24px] items-center justify-center rounded-full bg-[#7e9bb3]"
                  style={
                    focused
                      ? {
                          borderColor: globalStyles.primaryColor,
                        }
                      : {}
                  }>
                  <Text className="text-sm text-white">
                    {accountStore.currentUser?.name?.charAt(0)}
                  </Text>
                </View>
              );
            },
          }}
        />
      ) : (
        <Tab.Screen
          name="account"
          component={AccountStack}
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
      )}
    </Tab.Navigator>
  );
});
