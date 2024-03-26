import {Skeleton} from '@rneui/base';
import {observer} from 'mobx-react-lite';
import {useState} from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import {accountStoreIntance} from '../../auth/authProvider';
import {watchStoreIntance} from '../../screens/watchScreen';

export const Channel = observer(() => {
  const [btnLoading, setbtnLoading] = useState(false);
  const [watchStore] = useState(() => watchStoreIntance);
  const [accountStore] = useState(() => accountStoreIntance);
  const [subscribeStatus, setSubscribeStatus] = useState<boolean | null>(null);

  const handleGoToChannel = () => {};

  const handleSubscribe = async () => {
    setbtnLoading(true);
  };

  if (watchStore.channelLoading) {
    return (
      <View className="mt-3 flex w-full flex-row items-center justify-between">
        <View className="flex flex-row items-center gap-x-3">
          <Skeleton circle width={36} height={36} />
          <Skeleton width={100} height={10} />
        </View>
        <Skeleton circle width={80} height={32} />
      </View>
    );
  }

  return (
    <TouchableOpacity
      className="mt-3 flex flex-row items-center justify-between"
      onPress={handleGoToChannel}>
      <View className="flex flex-row items-center gap-x-3">
        <Image
          className="h-9 w-9 rounded-full"
          source={{
            uri: watchStore.channel?.picture || '',
          }}
        />
        <Text className="text-sm font-bold text-white">
          {watchStore.channel?.name || ''}
        </Text>
        <Text className="text-sm text-[#aaa]">
          {watchStore.channel?.numOfSubscriber || ''}
        </Text>
      </View>
      {watchStore.channel._id === accountStore.currentUser._id ? (
        <TouchableOpacity
          className="flex h-8 flex-row items-center rounded-full bg-white px-3"
          style={{
            opacity: btnLoading ? 0.3 : 1,
          }}>
          <Text className="text-xs font-bold text-black">My videos</Text>
        </TouchableOpacity>
      ) : (
        <>
          {subscribeStatus ? (
            <TouchableOpacity
              className="flex h-8 flex-row items-center rounded-full bg-white px-3"
              style={{
                opacity: btnLoading ? 0.3 : 1,
              }}>
              <Text className="text-xs font-bold text-black">Subscribed</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              className="flex h-8 flex-row items-center rounded-full bg-white px-3"
              style={{
                opacity: btnLoading ? 0.3 : 1,
              }}>
              <Text className="text-xs font-bold text-black">Subscribe</Text>
            </TouchableOpacity>
          )}
        </>
      )}
    </TouchableOpacity>
  );
});
