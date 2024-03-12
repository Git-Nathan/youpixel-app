import {NavigationContext, StackActions} from '@react-navigation/native';
import {Button} from '@rneui/themed';
import {observer} from 'mobx-react-lite';
import {useContext, useEffect, useState} from 'react';
import {ScrollView, Text, TextInput, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import BackArrow from '../../assets/icons/arrow-left.svg';
import DeleteIcon from '../../assets/icons/close.svg';
import SearchIcon from '../../assets/icons/search.svg';
import SendIcon from '../../assets/icons/send.svg';
import {api} from '../../axios';
import {IRelatedSearch} from '../../interface';

export interface ISearchBar {
  handleClose: () => void;
}

export const SearchBar = observer(({handleClose}: ISearchBar) => {
  const [relatedSearch, setrelatedSearch] = useState<IRelatedSearch[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const navigation = useContext(NavigationContext);

  const handleSearch = (text?: string) => {
    if (text) {
      navigation?.dispatch(
        StackActions.push('search-screen', {search_query: text}),
      );
    } else {
      navigation?.dispatch(
        StackActions.push('search-screen', {search_query: searchQuery}),
      );
    }
    handleClose();
  };

  // Get Related Search
  useEffect(() => {
    (async () => {
      const res = await api.search.getSiminalResults(searchQuery);

      setrelatedSearch(res.data);
    })();
  }, [searchQuery]);

  return (
    <View className="fixed h-full w-full">
      <View className="relative h-12 w-full flex-shrink-0 flex-row items-center bg-[#15141B] pl-2">
        <Button
          onPress={() => {
            handleClose();
          }}
          type="clear"
          buttonStyle={{
            width: 40,
            height: 40,
            borderRadius: 50,
          }}>
          <BackArrow color="white" />
        </Button>
        <TextInput
          className="ml-1 mr-2 h-8 grow rounded-full bg-[#1e232e] px-3 py-0 text-base text-white"
          placeholder="Search Youpixel"
          placeholderTextColor="#aaa"
          autoFocus
          onChangeText={text => {
            setSearchQuery(text);
          }}
          value={searchQuery}
          onSubmitEditing={() => {
            handleSearch();
          }}
        />
        {searchQuery && (
          <Button
            onPress={() => {
              setSearchQuery('');
            }}
            type="clear"
            radius="lg"
            buttonStyle={{
              borderRadius: 50,
              width: 30,
              height: 30,
            }}
            containerStyle={{
              position: 'absolute',
              right: 10,
            }}>
            <DeleteIcon color="white" />
          </Button>
        )}
      </View>
      <ScrollView className="left-0 h-full w-full flex-grow bg-[#15141B]">
        {relatedSearch.map((item, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => {
              handleSearch(item.content);
            }}>
            <View className="flex h-12 w-full flex-row items-center px-4">
              <View className="mr-6">
                <SearchIcon width={24} height={24} />
              </View>
              <Text
                numberOfLines={1}
                className="flex-grow text-base text-white">
                {item.content}
              </Text>
              <TouchableOpacity
                className="ml-6"
                onPress={() => {
                  setSearchQuery(item.content);
                }}>
                <SendIcon color={'white'} width={24} height={24} />
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
});
