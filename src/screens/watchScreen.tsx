import {RouteProp, useRoute} from '@react-navigation/native';
import {observer} from 'mobx-react-lite';
import {Text} from 'react-native';
import {Params} from '../types';

export const WatchScreen = observer(() => {
  const route = useRoute<RouteProp<Params, 'watchScreenParams'>>();

  return (
    <>
      <Text className="text-white">{route.params?.v}</Text>
    </>
  );
});
