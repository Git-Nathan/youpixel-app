import {NavigationContext} from '@react-navigation/native';
import {useContext} from 'react';
import {TouchableOpacity, View} from 'react-native';
import {IVideo} from '../../interface';

export interface IStudioVideoCardProps {
  video: IVideo;
}

export function StudioVideoCard(props: IStudioVideoCardProps) {
  const navigation = useContext(NavigationContext);

  const handleNavigation = () => {};

  return (
    <TouchableOpacity
      onPress={handleNavigation}
      className="mx-3 mb-4 flex flex-row">
      <View className="aspect-[16/9] w-5/12"></View>
      <View className="bg-red flex w-7/12 space-y-2 pl-4">
        <View className="flex flex-row space-x-2"></View>
      </View>
    </TouchableOpacity>
  );
}
