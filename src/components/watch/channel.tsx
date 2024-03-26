import {Skeleton} from '@rneui/base';
import {observer} from 'mobx-react-lite';
import {useEffect, useState} from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import {accountStoreIntance} from '../../auth/authProvider';
import {api} from '../../axios';
import {watchStoreIntance} from '../../screens/watchScreen';

export const Channel = observer(() => {
  const [watchStore] = useState(() => watchStoreIntance);
  const [accountStore] = useState(() => accountStoreIntance);
  const [subscribeStatus, setSubscribeStatus] = useState<boolean | null>(null);

  const handleGoToChannel = () => {};

  const handleSubscribe = async () => {
    setSubscribeStatus(true);
    try {
      watchStore?.channel?._id &&
        (await api.subscribe.subscribe(watchStore?.channel?._id));
    } catch (error) {
      console.log('error', error);
    } finally {
      updateStatus();
    }
  };

  const handleUnSubscribe = async () => {
    setSubscribeStatus(false);
    try {
      watchStore?.channel?._id &&
        (await api.subscribe.unsubscribe(watchStore?.channel?._id));
    } catch (error) {
      console.log('error', error);
    } finally {
      updateStatus();
    }
  };

  const updateStatus = async () => {
    try {
      const res = await api.subscribe.getStatus(watchStore?.channel?._id);
      setSubscribeStatus(res?.data?.data?.status);
    } catch (error) {
      console.log('error', error);
    }
  };

  useEffect(() => {
    if (watchStore?.channel?._id) {
      updateStatus();
    }
  }, [watchStore?.channel?._id]);

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
        <TouchableOpacity className="flex h-8 flex-row items-center rounded-full bg-white px-3">
          <Text className="text-xs font-bold text-black">My videos</Text>
        </TouchableOpacity>
      ) : (
        <>
          {subscribeStatus ? (
            <TouchableOpacity
              className="flex h-8 flex-row items-center rounded-full px-3"
              onPress={handleUnSubscribe}
              style={{
                backgroundColor: '#1e232e',
              }}>
              <Text className="text-xs font-bold text-white">Subscribed</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              className="flex h-8 flex-row items-center rounded-full bg-white px-3"
              onPress={handleSubscribe}>
              <Text className="text-xs font-bold text-black">Subscribe</Text>
            </TouchableOpacity>
          )}
        </>
      )}
    </TouchableOpacity>
  );
});
