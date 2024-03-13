import {GoogleSigninButton} from '@react-native-google-signin/google-signin';
import {useState} from 'react';
import {View} from 'react-native';
import {accountStoreIntance} from '../../auth/authProvider';
import {isSignedIn, signIn, signOut} from '../../utils/googleSignin';

export interface ISigninScreenProps {}

export function SigninScreen(props: ISigninScreenProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleSignin = async () => {
    setIsLoading(true);
    const signedIn = await isSignedIn();
    if (signedIn) {
      signOut();
    } else {
      await signIn();
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
