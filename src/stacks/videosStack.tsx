import {createStackNavigator} from '@react-navigation/stack';
import {SearchScreen} from '../screens/searchScreen';
import {VideosScreen} from '../screens/videosScreen';

export const VideosStackIntance = createStackNavigator();

export function VideosStack() {
  return (
    <VideosStackIntance.Navigator screenOptions={{headerShown: false}}>
      <VideosStackIntance.Screen
        name="videos-screen"
        component={VideosScreen}
      />
      <VideosStackIntance.Screen
        name="search-screen"
        component={SearchScreen}
      />
    </VideosStackIntance.Navigator>
  );
}
