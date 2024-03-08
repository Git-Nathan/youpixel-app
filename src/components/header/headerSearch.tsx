import {observer} from 'mobx-react-lite';
import {Text, View} from 'react-native';

export interface IHeaderSearchProps {}

export const HeaderSearch = observer((props: IHeaderSearchProps) => {
  return (
    <View className="h-12 flex-row items-center justify-between bg-[#15141B] pl-3 pr-1">
      <Text>HeaderSearch</Text>
    </View>
  );
});
