import {observer} from 'mobx-react-lite';
import {useEffect, useLayoutEffect, useState} from 'react';
import {VideoCardSkeleton} from '../components/skeleton/videoCard';
import {VideoCard} from '../components/videoCard';
import {VideosStore} from '../stores/videos';

const videosStoreIntance = new VideosStore();

export interface IVideosScreen {}

function VideosScreen(props: IVideosScreen) {
  const [store] = useState(() => videosStoreIntance);

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

  return store.videoList.map((video, index) => (
    <VideoCard key={index} video={video} />
  ));
}

export default observer(VideosScreen);
