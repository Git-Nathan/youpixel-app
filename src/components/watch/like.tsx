import {Skeleton} from '@rneui/base';
import {observer} from 'mobx-react-lite';
import {useEffect, useState} from 'react';
import {Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import DislikeIcon from '../../assets/icons/dislike.svg';
import LikeIcon from '../../assets/icons/like.svg';
import {watchStoreIntance} from '../../screens/watchScreen';

export interface ILike {
  videoId: string;
}

export const Like = observer((props: ILike) => {
  const [watchStore] = useState(() => watchStoreIntance);

  useEffect(() => {
    watchStore.getNumberOfLikes(props.videoId);
  }, []);

  if (watchStore.likeLoading) {
    return <Skeleton circle width={80} height={32} />;
  }

  return (
    <View
      className="flex flex-row rounded-full"
      style={{
        backgroundColor: '#1e232e',
      }}>
      <TouchableOpacity className="flex h-8 flex-row items-center px-3">
        <LikeIcon color="white" width={18} height={18} />
        <Text className="ml-2 text-white">
          {watchStore.numberOfLikes?.liked > 0
            ? watchStore.numberOfLikes?.liked
            : 'Like'}
        </Text>
      </TouchableOpacity>
      <View
        className="my-auto h-4 w-px"
        style={{
          backgroundColor: 'white',
        }}
      />
      <TouchableOpacity className="flex h-8 flex-row items-center px-3">
        <DislikeIcon color="white" width={18} height={18} />
        {watchStore.numberOfLikes?.disliked > 0 && (
          <Text className="ml-2 text-white">
            {watchStore.numberOfLikes?.disliked}
          </Text>
        )}
      </TouchableOpacity>
    </View>
  );
});
