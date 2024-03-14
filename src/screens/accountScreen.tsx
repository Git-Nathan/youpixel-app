import {NavigationContext, StackActions} from '@react-navigation/native';
import clsx from 'clsx';
import {observer} from 'mobx-react-lite';
import {useContext, useState} from 'react';
import {Image, Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {SvgProps} from 'react-native-svg';
import HistoryIcon from '../assets/icons/video-play.svg';
import VideoSquareIcon from '../assets/icons/video-square.svg';
import {accountStoreIntance} from '../auth/authProvider';
import {SigninScreen} from '../components/account/signinScreen';
import {AccountHeader} from '../components/header/accountHeader';

const AccountMenuBtn = ({
  title,
  Icon,
  className,
  onPress,
}: {
  title: string;
  Icon: React.FC<SvgProps>;
  className?: string;
  onPress: () => void;
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className={clsx('flex flex-row items-center px-6 py-3', className)}>
      <Icon color="white" width={26} height={26} />
      <Text className="ml-6 text-base text-white">{title}</Text>
    </TouchableOpacity>
  );
};

export interface IAccountScreen {}

export const AccountScreen = observer(({}: IAccountScreen) => {
  const navigation = useContext(NavigationContext);
  const [accountStore] = useState(() => accountStoreIntance);

  const handleGoToHistory = () => {
    navigation?.dispatch(StackActions.push('history-screen'));
  };

  return (
    <>
      {accountStore.isSignedIn ? (
        <>
          <AccountHeader />
          <View className="px-3">
            <View className="flex flex-row items-center">
              {accountStore.currentUser?.picture ? (
                <Image
                  className="h-[72px] w-[72px] rounded-full"
                  source={{
                    uri: accountStore.currentUser?.picture,
                  }}
                />
              ) : (
                <View className="flex h-[72px] w-[72px] items-center justify-center rounded-full bg-[#7e9bb3]">
                  <Text className="translate-y-px text-4xl text-white">
                    {accountStore.currentUser?.name?.charAt(0)}
                  </Text>
                </View>
              )}
              <Text className="ml-4 text-2xl font-bold text-white">
                {accountStore.currentUser?.name}
              </Text>
            </View>
          </View>
          <View className="mt-10 w-full">
            <AccountMenuBtn
              title="History"
              Icon={HistoryIcon}
              onPress={handleGoToHistory}
            />
            <AccountMenuBtn
              title="Your videos"
              Icon={VideoSquareIcon}
              onPress={handleGoToHistory}
            />
          </View>
        </>
      ) : (
        <SigninScreen />
      )}
    </>
  );
});
