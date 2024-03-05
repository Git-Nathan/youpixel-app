import {Button} from '@rneui/themed';
import {observer} from 'mobx-react-lite';
import {useEffect, useState} from 'react';
import {ScrollView, Text, TextInput, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import BackArrow from '../../assets/icons/arrow-left.svg';
import DeleteIcon from '../../assets/icons/close.svg';
import SearchIcon from '../../assets/icons/search.svg';
import SendIcon from '../../assets/icons/send.svg';
import {api} from '../../axios';
import {IRelatedSearch} from '../../interface';
import {videosStore} from '../../screens/videosScreen';

export const SearchBar = observer(() => {
  const [store] = useState(() => videosStore);

  const [relatedSearch, setrelatedSearch] = useState<IRelatedSearch[]>([]);

  const handleSearch = () => {};

  // Get Related Search
  useEffect(() => {
    (async () => {
      const res = await api.search.getSiminalResults(store.searchQuery);

      setrelatedSearch(res.data);
    })();
  }, [store.searchQuery]);

  return (
    <View className="fixed h-full w-full">
      <View className="relative h-12 w-full flex-shrink-0 flex-row items-center bg-[#15141B] pl-2">
        <Button
          onPress={() => {
            store.handleCloseSearchBar();
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
            store.setSearchQuery(text);
          }}
          value={store.searchQuery}
          onSubmitEditing={handleSearch}
        />
        {store.searchQuery && (
          <Button
            onPress={() => {
              store.setSearchQuery('');
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
          <View
            key={index}
            className="flex h-12 w-full flex-row items-center px-4">
            <View className="mr-6">
              <SearchIcon width={24} height={24} />
            </View>
            <Text numberOfLines={1} className="flex-grow text-base text-white">
              {item.content}
            </Text>
            <TouchableOpacity
              className="ml-6"
              onPress={() => {
                store.setSearchQuery(item.content);
              }}>
              <SendIcon color={'white'} width={24} height={24} />
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </View>
  );
});
