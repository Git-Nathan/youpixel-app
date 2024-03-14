import {createStackNavigator} from '@react-navigation/stack';
import {AccountScreen} from '../screens/accountScreen';
import {HistoryScreen} from '../screens/historyScreen';
import {SearchScreen} from '../screens/searchScreen';

export const AccountStackIntance = createStackNavigator();

export function AccountStack() {
  return (
    <AccountStackIntance.Navigator screenOptions={{headerShown: false}}>
      <AccountStackIntance.Screen
        name="account-screen"
        component={AccountScreen}
      />
      <AccountStackIntance.Screen
        name="search-screen"
        component={SearchScreen}
      />
      <AccountStackIntance.Screen
        name="history-screen"
        component={HistoryScreen}
      />
    </AccountStackIntance.Navigator>
  );
}
