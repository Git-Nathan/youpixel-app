import {observer} from 'mobx-react-lite';
import {useEffect, useState} from 'react';
import {FlatList, Text} from 'react-native';
import {api} from '../axios';
import {Header} from '../components/header/header';
import {VideoCardSkeleton} from '../components/skeleton/videoCardSkeleton';
import {VideoCard} from '../components/videoList/videoCard';
import {IVideo} from '../interface';

export const VideosScreen = observer(() => {
  const [isLoading, setIsLoading] = useState(true);
  const [videoList, setVideoList] = useState<IVideo[]>([]);

  const getVideoList = async () => {
    setIsLoading(true);
    try {
      const res = await api.video.getVideos();
      setVideoList(res.data.data);
    } catch (error) {
      console.log('error', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getVideoList();
  }, []);

  return (
    <>
      <Header />
      {isLoading ? (
        Array.from({length: 4}).map((_, index) => (
          <VideoCardSkeleton key={index} />
        ))
      ) : (
        <FlatList
          data={videoList}
          renderItem={({item, index}) => <VideoCard key={index} video={item} />}
          keyExtractor={item => item._id}
          refreshing={isLoading}
          onRefresh={() => {
            getVideoList();
          }}
          ListEmptyComponent={
            <Text className="text-base text-white">No data available</Text>
          }
        />
      )}
    </>
  );
});
