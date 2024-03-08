import {Button} from '@rneui/themed';
import {observer} from 'mobx-react-lite';
import {Image, View} from 'react-native';
import SearchIcon from '../../assets/icons/search.svg';
import VideoIcon from '../../assets/icons/video.svg';
import {VideosStore} from '../../stores/videos';
import {SearchBar} from './searchBar';

export interface IHeaderProps {
  store: VideosStore;
}

export const Header = observer(({store}: IHeaderProps) => {
  if (store.openSearchBar) {
    return <SearchBar store={store} />;
  }

  return (
    <View className="h-12 flex-row items-center justify-between bg-[#15141B] pl-3 pr-1">
      <View>
        <Image
          style={{
            height: 18,
            aspectRatio: 600 / 104,
          }}
          source={require('../../assets/images/logo.png')}
        />
      </View>
      <View className="flex-row">
        <Button
          type="clear"
          radius="lg"
          buttonStyle={{
            borderRadius: 50,
            width: 40,
            height: 40,
          }}>
          <VideoIcon />
        </Button>
        <Button
          onPress={() => {
            store.handleOpenSearchBar();
          }}
          type="clear"
          buttonStyle={{
            borderRadius: 50,
            width: 40,
            height: 40,
          }}
          containerStyle={{
            marginLeft: 4,
          }}>
          <SearchIcon />
        </Button>
      </View>
    </View>
  );
});
