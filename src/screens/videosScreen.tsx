import {observer} from 'mobx-react-lite';
import {useEffect, useLayoutEffect, useState} from 'react';
import {FlatList} from 'react-native';
import {Header} from '../components/header/header';
import {VideoCardSkeleton} from '../components/skeleton/videoCard';
import {VideoCard} from '../components/videoList/videoCard';
import {VideosStore} from '../stores/videos';

export const VideosScreen = observer(() => {
  const [store] = useState(() => new VideosStore());

  useLayoutEffect(() => {
    store.setIsLoading(true);
  }, []);

  useEffect(() => {
    store.getVideoList();
  }, []);

  return (
    <>
      <Header store={store} />
      {store.isLoading ? (
        Array.from({length: 4}).map((_, index) => (
          <VideoCardSkeleton key={index} />
        ))
      ) : (
        <FlatList
          data={store.videoList}
          renderItem={({item}) => <VideoCard video={item} />}
          keyExtractor={item => item._id}
          refreshing={store.isLoading}
          onRefresh={() => {
            store.getVideoList();
          }}
        />
      )}
    </>
  );
});
