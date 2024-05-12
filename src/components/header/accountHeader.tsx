import {observer} from 'mobx-react-lite';
import {useState} from 'react';
import {TouchableOpacity, View} from 'react-native';
import SettingIcon from '../../assets/icons/setting.svg';
import {accountStoreIntance} from '../../auth/authProvider';
import {signOut} from '../../utils/googleSignin';
import MenuButton from '../button/MenuButton';

export const AccountHeader = observer(() => {
  const [openMenu, setOpenMenu] = useState(false);

  const handleToggleMenu = () => {
    setOpenMenu(prev => !prev);
  };

  const handleLogout = async () => {
    await signOut();
    accountStoreIntance.getUserFromStorage();
  };

  return (
    <View className="h-12 flex-row items-center justify-end bg-[#15141B] pl-3 pr-1">
      <View className="relative">
        <TouchableOpacity
          onPress={handleToggleMenu}
          className="flex h-10 w-10 items-center justify-center rounded-full">
          <SettingIcon color="white" width={26} height={26} />
        </TouchableOpacity>
        {openMenu && (
          <View className="absolute right-0 top-full w-[160px] rounded-md bg-[#1e232e]">
            <MenuButton title="Logout" onPress={handleLogout} />
          </View>
        )}
      </View>
    </View>
  );
});
