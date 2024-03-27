import {createStackNavigator} from '@react-navigation/stack';
import {SearchScreen} from '../screens/searchScreen';
import {SubscriptionScreen} from '../screens/subscriptionScreen';

export const SubscriptionStackIntance = createStackNavigator();

export function SubscriptionStack() {
  return (
    <SubscriptionStackIntance.Navigator screenOptions={{headerShown: false}}>
      <SubscriptionStackIntance.Screen
        name="videos-screen"
        component={SubscriptionScreen}
      />
      <SubscriptionStackIntance.Screen
        name="search-screen"
        component={SearchScreen}
      />
    </SubscriptionStackIntance.Navigator>
  );
}
