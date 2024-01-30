import {NavigationContext} from '@react-navigation/native';
import moment from 'moment';
import {useContext} from 'react';
import {Image, Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {IVideo} from '../../interface';

export interface IVideoCardProps {
  video: IVideo;
}

export function VideoCard(props: IVideoCardProps) {
  const navigation = useContext(NavigationContext);

  const handleNavigation = () => {
    navigation?.navigate('watch', {v: props.video._id});
  };

  return (
    <TouchableOpacity onPress={handleNavigation} className="mb-4 max-w-full">
      <Image
        className="aspect-[16/9] w-full"
        source={{
          uri: props.video.imgUrl,
        }}
      />
      <View className="flex grow flex-row p-3">
        <Image
          className="h-10 w-10 rounded-full"
          source={{
            uri: props.video.userInfo.picture,
          }}
        />
        <View className="flex w-full pl-3 pr-12">
          <Text numberOfLines={2} className=" font-bold text-white">
            {props.video.title}
          </Text>
          <Text numberOfLines={1} className="mt-[2px] text-[12px] text-[#aaa]">
            {`${props.video.userInfo.name}`}
            <Text className="text-[#f05123]"> • </Text>
            {`${props.video.views} views`}
            <Text className="text-[#f05123]"> • </Text>
            {moment(props.video.createdAt).fromNow()}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
