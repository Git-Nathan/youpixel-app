import {Skeleton} from '@rneui/themed';
import {Image, View} from 'react-native';
import {IVideo} from '../interface';

export interface IVideoCardProps {
  video: IVideo;
}

export function VideoCard(props: IVideoCardProps) {
  return (
    <View className="mb-4">
      <Image
        className="aspect-[16/9] w-full"
        source={{
          uri: props.video.imgUrl,
        }}
      />
      <View className="flex flex-row p-3">
        <Skeleton width={40} height={40} circle />
        <View className="grid grow gap-2 px-3">
          <Skeleton />
          <Skeleton />
          <Skeleton width="50%" />
        </View>
      </View>
    </View>
  );
}
