import {RouteProp, useRoute} from '@react-navigation/native';
import {Skeleton} from '@rneui/base';
import {observer} from 'mobx-react-lite';
import moment from 'moment';
import {useEffect, useState} from 'react';
import {ScrollView, Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import ShareIcon from '../assets/icons/share.svg';
import {api} from '../axios';
import {VideoCardSkeleton} from '../components/skeleton/videoCardSkeleton';
import {VideoCard} from '../components/videoList/videoCard';
import {Channel} from '../components/watch/channel';
import {Like} from '../components/watch/like';
import {PreviewComment} from '../components/watch/previewComment';
import {VideoPlayer} from '../components/watch/videoPlayer';
import {WatchStore} from '../stores/watch';
import {Params} from '../types';

export const watchStoreIntance = new WatchStore();

export const WatchScreen = observer(() => {
  const route = useRoute<RouteProp<Params, 'watchScreenParams'>>();
  const videoId = route.params?.v as string;

  const [watchStore] = useState(() => watchStoreIntance);

  const handleShowDesc = () => {};

  const handleShare = () => {};

  useEffect(() => {
    watchStore.getDetail(videoId);
    watchStore.getVideoList();
    (() => {
      api.watched.addWatchedVideo(videoId);
    })();

    const timeoutId = setTimeout(() => {
      api.video.addView(videoId);
    }, 30000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  if (watchStore.isLoading)
    return (
      <>
        <Skeleton width={'100%'} height={230} />
        <View className="p-3">
          <View className="gap-y-2">
            <Skeleton width={'100%'} height={15} />
            <Skeleton width={'100%'} height={15} />
            <Skeleton width={'60%'} height={15} />
          </View>
          <View className="mt-5 flex flex-row items-center justify-between">
            <View className="flex flex-row items-center gap-x-3">
              <Skeleton circle width={36} height={36} />
              <Skeleton width={100} height={10} />
            </View>
            <Skeleton circle width={80} height={32} />
          </View>
          <View className="mt-3 flex flex-row items-center gap-x-3">
            <Skeleton circle width={80} height={32} />
            <Skeleton circle width={80} height={32} />
          </View>
          <View className="mb-3 mt-5">
            <Skeleton width={'100%'} height={90} />
          </View>
        </View>
        <VideoCardSkeleton />
        <VideoCardSkeleton />
      </>
    );

  return (
    <>
      <VideoPlayer />
      <ScrollView>
        <View className="mb-3 p-3">
          <TouchableOpacity onPress={handleShowDesc}>
            <Text
              className="w-full text-base font-bold text-white"
              numberOfLines={2}>
              {watchStore.video.title}
            </Text>
            <View className="mt-1 flex flex-row gap-x-2">
              <Text className="text-[12px] text-[#aaa]">
                {watchStore.video.views} views
                <Text className="text-[#f05123]"> • </Text>
                {moment(watchStore.video.createdAt).fromNow()}
              </Text>
              <Text className="text-xs text-white">...more</Text>
            </View>
          </TouchableOpacity>

          <Channel />

          <View className="mt-3 flex flex-row items-center space-x-3">
            <Like videoId={videoId} />
            <View
              className="flex flex-row rounded-full"
              style={{
                backgroundColor: '#1e232e',
              }}>
              <TouchableOpacity
                className="flex h-8 flex-row items-center px-3"
                onPress={handleShare}>
                <ShareIcon color="white" width={18} height={18} />
                <Text className="ml-2 text-white">Share</Text>
              </TouchableOpacity>
            </View>
          </View>

          <PreviewComment videoId={videoId} />
        </View>
        {watchStore.videoList.map((item, index) => (
          <VideoCard key={index} video={item} replace />
        ))}
      </ScrollView>
    </>
  );
});
