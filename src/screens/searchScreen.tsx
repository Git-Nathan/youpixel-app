import {RouteProp, useRoute} from '@react-navigation/native';
import {observer} from 'mobx-react-lite';
import {useEffect, useState} from 'react';
import {FlatList} from 'react-native';
import {api} from '../axios';
import {HeaderSearch} from '../components/header/headerSearch';
import {VideoCardSkeleton} from '../components/skeleton/videoCard';
import {VideoCard} from '../components/videoList/videoCard';
import {IVideo} from '../interface';
import {Params} from '../types';

export const SearchScreen = observer(() => {
  const route = useRoute<RouteProp<Params, 'searchScreenParams'>>();
  const searchQuery = route.params?.search_query as string;
  const [isLoading, setIsLoading] = useState(true);
  const [videoList, setVideoList] = useState<IVideo[]>([]);

  // Pagination
  const [page, setPage] = useState(1);

  const [numOfPage, setNumOfPage] = useState(0);

  const [total, setTotal] = useState(0);

  const getVideoList = async (page: number) => {
    setIsLoading(true);
    try {
      const res = await api.video.getVideosBySearch(searchQuery, page);
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
      <HeaderSearch currentQuery={searchQuery} />
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
        />
      )}
    </>
  );
});
