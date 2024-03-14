import {observer} from 'mobx-react-lite';
import {useEffect, useState} from 'react';
import {FlatList, Text} from 'react-native';
import {api} from '../axios';
import {TitleHeader} from '../components/header/titleHeader';
import {VideoCardSkeleton} from '../components/skeleton/videoCard';
import {VideoCard} from '../components/videoList/videoCard';
import {IVideo} from '../interface';

export const HistoryScreen = observer(() => {
  const [isLoading, setIsLoading] = useState(true);
  const [videoList, setVideoList] = useState<IVideo[]>([]);
  const [page, setPage] = useState(1);

  const getVideoList = async (page: number) => {
    setIsLoading(true);
    try {
      const res = await api.watched.getWatchedVideos(page);
      setVideoList(res.data.data);
    } catch (error) {
      console.log('error', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getVideoList(page);
  }, [page]);

  return (
    <>
      <TitleHeader title="History" />
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
          ListEmptyComponent={
            <Text className="text-base text-white">No data available</Text>
          }
          onRefresh={() => {
            getVideoList(1);
          }}
        />
      )}
    </>
  );
});
