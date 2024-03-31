import {Skeleton} from '@rneui/themed';
import {View} from 'react-native';

export function StudioVideoCardSkeleton() {
  return (
    <View className="mx-3 mb-4 flex flex-row">
      <View className="aspect-[16/9] w-5/12">
        <Skeleton height="100%" />
      </View>
      <View className="bg-red flex w-7/12 space-y-2 pl-4">
        <Skeleton width="60%" height={16} />
        <Skeleton width="100%" height={16} />
        <Skeleton width="30%" height={16} />
        <View className="flex flex-row space-x-2">
          <Skeleton width="10%" height={16} circle />
          <Skeleton width="10%" height={16} circle />
        </View>
      </View>
    </View>
  );
}
