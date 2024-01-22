import {Button} from '@rneui/themed';
import {Image, View} from 'react-native';
import SearchIcon from '../assets/icons/search.svg';
import VideoIcon from '../assets/icons/video.svg';

export interface IHeaderProps {}

export function Header(props: IHeaderProps) {
  return (
    <View className="h-12 flex-row items-center justify-between bg-[#15141B] pl-3 pr-1">
      <View>
        <Image
          style={{
            height: 18,
            aspectRatio: 600 / 104,
          }}
          source={require('../assets/images/logo.png')}
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
}
