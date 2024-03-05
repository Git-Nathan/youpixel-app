import {observer} from 'mobx-react-lite';
import {useEffect, useLayoutEffect, useState} from 'react';
import {FlatList} from 'react-native';
import {VideoCardSkeleton} from '../components/skeleton/videoCard';
import {VideoCard} from '../components/videoList/videoCard';
import {VideosStore} from '../stores/videos';

export const videosStore = new VideosStore();

export const VideosScreen = observer(() => {
  const [store] = useState(() => videosStore);

  useLayoutEffect(() => {
    store.setIsLoading(true);
  }, []);

  useEffect(() => {
    store.getVideoList();
  }, []);

  if (store.isLoading) {
    return Array.from({length: 4}).map((_, index) => (
      <VideoCardSkeleton key={index} />
    ));
  }

  return (
    <FlatList
      data={store.videoList}
      renderItem={({item}) => <VideoCard video={item} />}
      keyExtractor={item => item._id}
      refreshing={store.isLoading}
      onRefresh={() => {
        store.getVideoList();
      }}
    />
  );
});
