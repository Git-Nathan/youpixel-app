import {NavigationContext} from '@react-navigation/native';
import {Skeleton} from '@rneui/base';
import {Dialog} from '@rneui/themed';
import {observer} from 'mobx-react-lite';
import moment from 'moment';
import {useContext, useEffect, useState} from 'react';
import {
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Popover from 'react-native-popover-view/dist/Popover';
import MoreIcon from '../../assets/icons/more.svg';
import {accountStoreIntance} from '../../auth/authProvider';
import {api} from '../../axios';
import {watchStoreIntance} from '../../screens/watchScreen';
import {AppDialog} from '../common/appDialog';

export interface IPreviewComment {
  videoId: string;
}

export const PreviewComment = observer((props: IPreviewComment) => {
  const [watchStore] = useState(() => watchStoreIntance);
  const [accountStore] = useState(() => accountStoreIntance);
  const navigation = useContext(NavigationContext);

  useEffect(() => {
    watchStore.getComment(props.videoId, 1);
  }, []);

  //Dialog
  const [visible, setVisible] = useState(false);

  const toggleDialog = () => {
    setVisible(prev => !prev);
  };

  // Comment input
  const [commentInput, setCommentInput] = useState('');

  const handleComment = async () => {
    setCommentInput('');
    try {
      await api.comment.addComment(props.videoId, commentInput);
    } catch (error) {
      console.log('error', error);
    } finally {
      watchStore.getComment(props.videoId, 1);
    }
  };

  const handleGoToAccount = () => {
    navigation?.navigate('account');
  };

  if (watchStore.commentLoading) {
    return (
      <View className="mb-3 mt-5">
        <Skeleton width={'100%'} height={90} />
      </View>
    );
  }

  const handleDelete = async (id: string) => {
    try {
      await api.comment.deleteComment(id);
      watchStore.getComment(props.videoId, 1);
    } catch (error) {
      console.log('error', error);
    }
  };

  return (
    <>
      <TouchableOpacity
        className="mt-4 rounded-2xl px-3 py-2"
        style={{
          backgroundColor: '#1e232e',
        }}
        onPress={accountStore.isSignedIn ? toggleDialog : handleGoToAccount}>
        <Text className="text-sm font-bold text-white">
          Comments{' '}
          <Text className="text-sm font-normal text-[#aaa]">
            {watchStore.comment?.total || 0}
          </Text>
        </Text>

        {watchStore.comment?.data?.length > 0 && (
          <View className="mb-1 mt-3 flex flex-row items-center">
            <Image
              className="mr-3 h-6 w-6 flex-shrink-0 rounded-full"
              source={{
                uri: watchStore.comment?.data[0]?.userInfo?.picture || '',
              }}
            />
            <Text numberOfLines={2} className="flex-grow text-xs text-white">
              {watchStore.comment?.data[0]?.desc}
            </Text>
          </View>
        )}
      </TouchableOpacity>
      <Dialog
        isVisible={visible}
        onBackdropPress={toggleDialog}
        overlayStyle={{
          backgroundColor: '#1e232e',
          width: '95%',
        }}>
        <Dialog.Title titleStyle={{color: 'white'}} title="Comments" />
        <ScrollView className="max-h-[90%]">
          <View className="flex w-full space-y-5">
            {watchStore.comment?.data?.map(item => (
              <View className="flex w-full max-w-full flex-row justify-between">
                <View className="flex flex-row">
                  <Image
                    className="mr-3 mt-1 h-6 w-6 flex-shrink-0 rounded-full"
                    source={{
                      uri: item?.userInfo?.picture || '',
                    }}
                  />
                  <View className="flex flex-col">
                    <Text
                      numberOfLines={1}
                      className="flex-grow text-sm text-gray-400">
                      {item?.userInfo.name} - {moment(item.createdAt).fromNow()}
                    </Text>
                    <Text className="flex-grow text-sm text-white">
                      {item?.desc}
                    </Text>
                  </View>
                </View>
                {accountStore?.currentUser?._id === item?.userInfo?._id && (
                  <Popover
                    from={
                      <TouchableOpacity className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full">
                        <MoreIcon color="white" width={20} height={20} />
                      </TouchableOpacity>
                    }>
                    <AppDialog
                      onConfirm={() => {
                        handleDelete(item._id);
                      }}
                      title="Confirm Delete"
                      content={
                        <Text>
                          Are you sure you want to delete this comment?
                        </Text>
                      }>
                      {handleToggle => (
                        <TouchableOpacity
                          className="px-3 py-2"
                          onPress={handleToggle}>
                          <Text className="text-[#000000]">Delete</Text>
                        </TouchableOpacity>
                      )}
                    </AppDialog>
                  </Popover>
                )}
              </View>
            ))}
          </View>
        </ScrollView>
        <View className="mt-3 flex flex-row">
          <Image
            className="mr-3 mt-1 h-6 w-6 flex-shrink-0 rounded-full"
            source={{
              uri: accountStore.currentUser?.picture || '',
            }}
          />
          <TextInput
            className="ml-1 mr-2 h-8 grow rounded-full bg-[#31394b] px-3 py-0 text-base text-white"
            placeholder="Add a comment..."
            placeholderTextColor="#aaa"
            autoFocus
            onChangeText={text => {
              setCommentInput(text);
            }}
            value={commentInput}
            onSubmitEditing={() => {
              handleComment();
            }}
          />
        </View>
      </Dialog>
    </>
  );
});
