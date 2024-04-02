import {NavigationContext} from '@react-navigation/native';
import {Skeleton} from '@rneui/base';
import {observer} from 'mobx-react-lite';
import {useContext, useEffect, useState} from 'react';
import {Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import DislikeIcon from '../../assets/icons/dislike.svg';
import LikeIcon from '../../assets/icons/like.svg';
import {accountStoreIntance} from '../../auth/authProvider';
import {api} from '../../axios';
import {watchStoreIntance} from '../../screens/watchScreen';
import {globalStyles} from '../../styles/globalStyles';

export interface ILike {
  videoId: string;
}

export const Like = observer((props: ILike) => {
  const [watchStore] = useState(() => watchStoreIntance);
  const [likeStatus, setlikeStatus] = useState<boolean | undefined>(undefined);
  const navigation = useContext(NavigationContext);
  const [accountStore] = useState(() => accountStoreIntance);

  const handleGoToAccount = () => {
    navigation?.navigate('account');
  };

  useEffect(() => {
    watchStore.getNumberOfLikes(props.videoId);
  }, []);

  const updateStatus = async () => {
    watchStore.getNumberOfLikes(props.videoId);
    try {
      const res = await api.like.getLikeStatus(props.videoId);

      setlikeStatus(res?.data?.data?.isLike);
    } catch (error) {
      console.log('error', error);
    }
  };

  const handleLike = async () => {
    setlikeStatus(true);

    try {
      await api.like.like(props.videoId);
    } catch (error) {
      console.log('error', error);
    } finally {
      updateStatus();
    }
  };

  const handleDisLike = async () => {
    setlikeStatus(false);

    try {
      await api.like.dislike(props.videoId);
    } catch (error) {
      console.log('error', error);
    } finally {
      updateStatus();
    }
  };

  const handleUnlike = async () => {
    setlikeStatus(undefined);

    try {
      await api.like.unlike(props.videoId);
    } catch (error) {
      console.log('error', error);
    } finally {
      updateStatus();
    }
  };

  useEffect(() => {
    updateStatus();
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
      {likeStatus ? (
        <TouchableOpacity
          className="flex h-8 flex-row items-center px-3"
          onPress={accountStore.isSignedIn ? handleUnlike : handleGoToAccount}>
          <LikeIcon color={globalStyles.primaryColor} width={18} height={18} />
          <Text className="ml-2" style={{color: globalStyles.primaryColor}}>
            {watchStore.numberOfLikes?.liked > 0
              ? watchStore.numberOfLikes?.liked
              : 'Like'}
          </Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          className="flex h-8 flex-row items-center px-3"
          onPress={accountStore.isSignedIn ? handleLike : handleGoToAccount}>
          <LikeIcon color="white" width={18} height={18} />
          <Text className="ml-2 text-white">
            {watchStore.numberOfLikes?.liked > 0
              ? watchStore.numberOfLikes?.liked
              : 'Like'}
          </Text>
        </TouchableOpacity>
      )}
      <View
        className="my-auto h-4 w-px"
        style={{
          backgroundColor: 'white',
        }}
      />
      {likeStatus === false ? (
        <TouchableOpacity
          className="flex h-8 flex-row items-center px-3"
          onPress={accountStore.isSignedIn ? handleUnlike : handleGoToAccount}>
          <DislikeIcon
            color={globalStyles.primaryColor}
            width={18}
            height={18}
          />
          {watchStore.numberOfLikes?.disliked > 0 && (
            <Text className="ml-2" style={{color: globalStyles.primaryColor}}>
              {watchStore.numberOfLikes?.disliked}
            </Text>
          )}
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          className="flex h-8 flex-row items-center px-3"
          onPress={accountStore.isSignedIn ? handleDisLike : handleGoToAccount}>
          <DislikeIcon color="white" width={18} height={18} />
          {watchStore.numberOfLikes?.disliked > 0 && (
            <Text className="ml-2 text-white">
              {watchStore.numberOfLikes?.disliked}
            </Text>
          )}
        </TouchableOpacity>
      )}
    </View>
  );
});
