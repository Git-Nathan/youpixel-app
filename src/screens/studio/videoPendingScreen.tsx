import {NavigationContext} from '@react-navigation/native';
import {Button} from '@rneui/base';
import {useContext, useEffect, useState} from 'react';
import {FlatList, Text} from 'react-native';
import VideoAddIcon from '../../assets/icons/video-add.svg';
import {accountStoreIntance} from '../../auth/authProvider';
import {api} from '../../axios';
import {TitleHeader} from '../../components/header/titleHeader';
import {StudioVideoCardSkeleton} from '../../components/skeleton/studioVideoCardSkeleton';
import {StudioVideoCard} from '../../components/videoList/studioVideoCard';
import {IVideo} from '../../interface';

export interface IVideoPendingScreenProps {}

export function VideoPendingScreen(props: IVideoPendingScreenProps) {
  const navigation = useContext(NavigationContext);
  const [accountStore] = useState(() => accountStoreIntance);
  const [isLoading, setIsLoading] = useState(true);
  const [videoList, setVideoList] = useState<IVideo[]>([]);
  const [page, setPage] = useState(1);

  const getVideoList = async (page: number) => {
    setIsLoading(true);
    try {
      const res = await api.video.getUserVideoPending(
        accountStore.currentUser._id,
        page,
      );
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
      <TitleHeader title="My Videos">
        <Button
          type="clear"
          radius="lg"
          buttonStyle={{
            borderRadius: 50,
            width: 40,
            height: 40,
          }}
          onPress={() => {
            navigation?.navigate('video-form');
          }}>
          <VideoAddIcon color={'white'} />
        </Button>
      </TitleHeader>
      {isLoading ? (
        Array.from({length: 4}).map((_, index) => (
          <StudioVideoCardSkeleton key={index} />
        ))
      ) : (
        <FlatList
          data={videoList}
          renderItem={({item, index}) => (
            <StudioVideoCard key={index} video={item} />
          )}
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
}
