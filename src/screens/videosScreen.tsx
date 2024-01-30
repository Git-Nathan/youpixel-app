import {observer} from 'mobx-react-lite';
import {useEffect, useLayoutEffect, useState} from 'react';
import {FlatList} from 'react-native';
import {VideoCardSkeleton} from '../components/skeleton/videoCard';
import {VideoCard} from '../components/videoList/videoCard';
import {mainStackVideosStore} from '../stacks/mainStack';

export const VideosScreen = observer(() => {
  const [store] = useState(() => mainStackVideosStore);

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
