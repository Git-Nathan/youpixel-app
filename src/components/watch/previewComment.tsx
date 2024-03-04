import {Skeleton} from '@rneui/base';
import {observer} from 'mobx-react-lite';
import {useEffect, useState} from 'react';
import {Text, View} from 'react-native';
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
    <View
      className="mb-3 mt-5 rounded-2xl px-3 py-2"
      style={{
        backgroundColor: '#1e232e',
      }}>
      <Text className="text-sm font-bold text-white">Comments</Text>
    </View>
  );
});
