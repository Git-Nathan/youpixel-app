import {NavigationContext, StackActions} from '@react-navigation/native';
import {observer} from 'mobx-react-lite';
import {useContext, useState} from 'react';
import {Text, TouchableWithoutFeedback, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import BackIcon from '../../assets/icons/arrow-left.svg';
import {SearchBar} from './searchBar';

export interface IHeaderSearchProps {
  currentQuery: string;
}

export const HeaderSearch = observer(({currentQuery}: IHeaderSearchProps) => {
  const navigation = useContext(NavigationContext);

  const handleBack = () => {
    navigation?.dispatch(StackActions.pop());
  };

  // Search bar
  const [openSearchBar, setOpenSearchBar] = useState(false);

  const handleOpenSearchBar = () => {
    setOpenSearchBar(true);
  };

  const handleCloseSearchBar = () => {
    setOpenSearchBar(false);
  };

  if (openSearchBar) {
    return <SearchBar handleClose={handleCloseSearchBar} />;
  }

  return (
    <View className="h-12 flex-row items-center bg-[#15141B] pl-2 pr-1">
      <TouchableOpacity
        onPress={handleBack}
        className="flex h-10 w-10 items-center justify-center rounded-full">
        <BackIcon color="white" width={26} height={26} />
      </TouchableOpacity>
      <TouchableWithoutFeedback onPress={handleOpenSearchBar}>
        <View className="ml-1 mr-2 flex h-8 flex-1 grow flex-row items-center rounded-full bg-[#1e232e] px-3 py-0">
          <Text className="text-base text-white">{currentQuery}</Text>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
});
