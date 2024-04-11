import {NavigationContext, StackActions} from '@react-navigation/native';
import moment from 'moment';
import {useContext} from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import {IVideo} from '../../interface';

export interface IStudioVideoCardProps {
  video: IVideo;
  replace?: boolean;
}

export function StudioVideoCard(props: IStudioVideoCardProps) {
  const navigation = useContext(NavigationContext);

  const handleNavigation = () => {
    if (props.replace) {
      navigation?.dispatch(
        StackActions.replace('video-form', {v: props.video._id}),
      );
    } else {
      navigation?.navigate('video-form', {v: props.video._id});
    }
  };

  return (
    <TouchableOpacity
      onPress={handleNavigation}
      className="mx-3 mb-4 flex flex-row">
      <Image
        className="aspect-[16/9] w-5/12"
        source={{
          uri: props?.video?.imgUrl,
        }}
      />
      <View className="bg-red flex w-7/12 space-y-2 pl-4">
        <View className="flex space-y-1">
          <Text numberOfLines={2} className="font-bold text-white">
            {props?.video?.title}
          </Text>
          <Text numberOfLines={2} className="mt-[2px] text-[12px] text-[#aaa]">
            {`${props.video.views} views`}
            <Text className="text-[#f05123]"> • </Text>
            {moment(props?.video?.createdAt).fromNow()}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
