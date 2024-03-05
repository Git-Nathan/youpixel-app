import {Skeleton} from '@rneui/base';
import {observer} from 'mobx-react-lite';
import {useEffect, useState} from 'react';
import {Image, Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {watchStoreIntance} from '../../screens/watchScreen';

export interface IPreviewComment {
  videoId: string;
}

export const PreviewComment = observer((props: IPreviewComment) => {
  const [watchStore] = useState(() => watchStoreIntance);

  useEffect(() => {
    watchStore.getComment(props.videoId, 1);
  }, []);

  if (watchStore.commentLoading) {
    return (
      <View className="mb-3 mt-5">
        <Skeleton width={'100%'} height={90} />
      </View>
    );
  }

  return (
    <TouchableOpacity
      className="mt-4 rounded-2xl px-3 py-2"
      style={{
        backgroundColor: '#1e232e',
      }}>
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
  );
});
