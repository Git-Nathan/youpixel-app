import {observer} from 'mobx-react-lite';
import {View} from 'react-native';
import {Text} from 'react-native-svg';

export const AccountHeader = observer(() => {
  return (
    <View className="h-12 flex-row items-center justify-between bg-[#15141B] pl-3 pr-1">
      <Text>AccountHeader</Text>
    </View>
  );
});
