import {Image} from 'react-native';
import {Appbar} from 'react-native-paper';
import {globalStyles} from '../styles/globalStyles';

export interface IHeaderProps {}

export function Header(props: IHeaderProps) {
  return (
    <Appbar.Header style={{backgroundColor: globalStyles.backgroundColor}}>
      <Appbar.Content
        title={
          <Image
            style={{
              height: 18,
              aspectRatio: 600 / 104,
            }}
            source={require('../assets/images/logo.png')}
          />
        }
      />
      <Appbar.Action icon="calendar" onPress={() => {}} />
      <Appbar.Action icon="magnify" onPress={() => {}} />
    </Appbar.Header>
  );
}
