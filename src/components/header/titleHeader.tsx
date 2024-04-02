import {NavigationContext, StackActions} from '@react-navigation/native';
import {ReactNode, useContext} from 'react';
import {Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import BackIcon from '../../assets/icons/arrow-left.svg';

export interface ITitleHeaderProps {
  title: string;
  children?: ReactNode;
}

export function TitleHeader(props: ITitleHeaderProps) {
  const navigation = useContext(NavigationContext);

  const handleBack = () => {
    navigation?.dispatch(StackActions.pop());
  };

  return (
    <View className="h-12 flex-row items-center justify-between bg-[#15141B] pl-2 pr-1">
      <View className="flex flex-row items-center">
        <TouchableOpacity
          onPress={handleBack}
          className="flex h-10 w-10 items-center justify-center rounded-full">
          <BackIcon color="white" width={26} height={26} />
        </TouchableOpacity>
        <Text className="ml-3 text-lg text-white">{props.title}</Text>
      </View>
      {props.children}
    </View>
  );
}
