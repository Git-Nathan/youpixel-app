import {NavigationContext} from '@react-navigation/native';
import {Button} from '@rneui/themed';
import {observer} from 'mobx-react-lite';
import {useContext, useState} from 'react';
import {Image, View} from 'react-native';
import SearchIcon from '../../assets/icons/search.svg';
import VideoIcon from '../../assets/icons/video.svg';
import {accountStoreIntance} from '../../auth/authProvider';
import {SearchBar} from './searchBar';

export interface IHeaderProps {}

export const Header = observer(({}: IHeaderProps) => {
  // Search bar
  const [openSearchBar, setOpenSearchBar] = useState(false);
  const [accountStore] = useState(() => accountStoreIntance);

  const handleOpenSearchBar = () => {
    setOpenSearchBar(true);
  };

  const handleCloseSearchBar = () => {
    setOpenSearchBar(false);
  };
  // navigation
  const navigation = useContext(NavigationContext);

  const handleGoToVMyVideos = () => {
    navigation?.navigate('studio');
  };

  const handleGoToAccount = () => {
    navigation?.navigate('account');
  };

  if (openSearchBar) {
    return <SearchBar handleClose={handleCloseSearchBar} />;
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
          }}
          onPress={
            accountStore.isSignedIn ? handleGoToVMyVideos : handleGoToAccount
          }>
          <VideoIcon color={'white'} />
        </Button>
        <Button
          onPress={() => {
            handleOpenSearchBar();
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
