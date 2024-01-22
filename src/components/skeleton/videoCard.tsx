import {Skeleton} from '@rneui/themed';
import {View} from 'react-native';

export interface IVideoCardSkeletonProps {}

export function VideoCardSkeleton(props: IVideoCardSkeletonProps) {
  return (
    <View className="mb-4">
      <View className="aspect-[16/9] w-full">
        <Skeleton height="100%" />
      </View>
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
