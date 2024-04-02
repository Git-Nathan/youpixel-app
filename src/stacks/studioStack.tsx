import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {observer} from 'mobx-react-lite';
import VideoTimeIcon from '../assets/icons/video-time.svg';
import VideoIcon from '../assets/icons/video.svg';
import {MyVideoScreen} from '../screens/studio/myVideoScreen';
import {globalStyles} from '../styles/globalStyles';
import {VideosStack} from './videosStack';

const Tab = createBottomTabNavigator();

export interface IMainStackProps {}

export const StudioStack = observer((props: IMainStackProps) => {
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
        name="my-videos"
        component={MyVideoScreen}
        options={{
          tabBarLabel: 'My videos',
          tabBarIcon: ({focused}) => {
            return (
              <VideoIcon
                color={focused ? globalStyles.primaryColor : 'white'}
                height="22px"
              />
            );
          },
        }}
      />
      <Tab.Screen
        name="pending-videos"
        component={VideosStack}
        options={{
          tabBarLabel: 'Pending videos',
          tabBarIcon: ({focused}) => {
            return (
              <VideoTimeIcon
                color={focused ? globalStyles.primaryColor : 'white'}
                height="22px"
              />
            );
          },
        }}
      />
    </Tab.Navigator>
  );
});
