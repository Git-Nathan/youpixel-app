import {GoogleSigninButton} from '@react-native-google-signin/google-signin';
import {NavigationContext} from '@react-navigation/native';
import {useContext, useState} from 'react';
import {View} from 'react-native';
import {accountStoreIntance} from '../../auth/authProvider';
import {isSignedIn, signIn, signOut} from '../../utils/googleSignin';

export interface ISigninScreenProps {}

export function SigninScreen(props: ISigninScreenProps) {
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useContext(NavigationContext);

  const handleSignin = async () => {
    setIsLoading(true);
    const signedIn = await isSignedIn();
    if (signedIn) {
      signOut();
    } else {
      const status = await signIn();
      if (!status) {
        navigation?.navigate('block');
      }
    }
    accountStoreIntance.getUserFromStorage();
    setIsLoading(false);
  };

  return (
    <View className="flex flex-1 items-center justify-center">
      <GoogleSigninButton onPress={handleSignin} disabled={isLoading} />
    </View>
  );
}
