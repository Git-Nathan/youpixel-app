import {useEffect, useState} from 'react';
import {FlatList, Text} from 'react-native';
import {api} from '../axios';
import {Header} from '../components/header/header';
import {VideoCardSkeleton} from '../components/skeleton/videoCard';
import {VideoCard} from '../components/videoList/videoCard';
import {IVideo} from '../interface';

export interface ISubscriptionScreenProps {}

export function SubscriptionScreen(props: ISubscriptionScreenProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [videoList, setVideoList] = useState<IVideo[]>([]);

  // Pagination
  const [page, setPage] = useState(1);

  const [numOfPage, setNumOfPage] = useState(0);

  const [total, setTotal] = useState(0);

  const getVideoList = async (page: number) => {
    setIsLoading(true);
    try {
      const res = await api.subscribe.getSubscribedVideos(page);
      setVideoList(res.data.data);
      setNumOfPage(res.data.numberOfPages);
      setTotal(res.data.total);
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
            getVideoList(1);
          }}
          ListEmptyComponent={
            <Text className="text-base text-white">No data available</Text>
          }
        />
      )}
    </>
  );
}
