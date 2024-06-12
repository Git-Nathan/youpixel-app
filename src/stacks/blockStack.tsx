import {NavigationContext} from '@react-navigation/native';
import {Button} from '@rneui/base';
import {observer} from 'mobx-react-lite';
import {useContext} from 'react';
import {Text, View} from 'react-native';

export const BlockScreen = observer(() => {
  const navigation = useContext(NavigationContext);

  const handleGoToHome = () => {
    navigation?.navigate('main');
  };

  return (
    <>
      <View className="flex flex-1 items-center justify-center">
        <Text className="mb-5 text-xl text-white">
          Your account has been blocked
        </Text>
        <Button onPress={handleGoToHome} className="rounded-md px-4">
          <Text className="text-white">Go back</Text>
        </Button>
      </View>
    </>
  );
});
