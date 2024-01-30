import {Button} from '@rneui/themed';
import {observer} from 'mobx-react-lite';
import {useState} from 'react';
import {TextInput, View} from 'react-native';
import BackArrow from '../../assets/icons/arrow-left.svg';
import DeleteIcon from '../../assets/icons/close.svg';
import {mainStackVideosStore} from '../../stacks/mainStack';

export const SearchBar = observer(() => {
  const [store] = useState(() => mainStackVideosStore);

  return (
    <View>
      <View className="relative h-12 w-full flex-row items-center bg-[#15141B] pl-2">
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
    </View>
  );
});
