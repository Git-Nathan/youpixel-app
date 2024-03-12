import {createStackNavigator} from '@react-navigation/stack';
import {SearchScreen} from '../screens/searchScreen';
import {TrendingScreen} from '../screens/trendingScreen';

export const TrendingStackIntance = createStackNavigator();

export function TrendingStack() {
  return (
    <TrendingStackIntance.Navigator screenOptions={{headerShown: false}}>
      <TrendingStackIntance.Screen
        name="videos-screen"
        component={TrendingScreen}
      />
      <TrendingStackIntance.Screen
        name="search-screen"
        component={SearchScreen}
      />
    </TrendingStackIntance.Navigator>
  );
}
