import {Skeleton} from '@rneui/base';
import {Dialog} from '@rneui/themed';
import {observer} from 'mobx-react-lite';
import moment from 'moment';
import {useEffect, useState} from 'react';
import {Image, ScrollView, Text, TextInput, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {accountStoreIntance} from '../../auth/authProvider';
import {api} from '../../axios';
import {watchStoreIntance} from '../../screens/watchScreen';

export interface IPreviewComment {
  videoId: string;
}

export const PreviewComment = observer((props: IPreviewComment) => {
  const [watchStore] = useState(() => watchStoreIntance);
  const [accountStore] = useState(() => accountStoreIntance);

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

  if (watchStore.commentLoading) {
    return (
      <View className="mb-3 mt-5">
        <Skeleton width={'100%'} height={90} />
      </View>
    );
  }

  return (
    <>
      <TouchableOpacity
        className="mt-4 rounded-2xl px-3 py-2"
        style={{
          backgroundColor: '#1e232e',
        }}
        onPress={toggleDialog}>
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
          <View className="flex space-y-5">
            {watchStore.comment?.data?.map(item => (
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
