import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import {api} from '../axios';

GoogleSignin.configure();

export const signIn = async () => {
  try {
    await GoogleSignin.hasPlayServices();
    const userInfo = await GoogleSignin.signIn();

    const res = await api.user.signinWithGoogle({
      email: userInfo.user.email,
      name: userInfo.user.name as string,
      picture: userInfo.user.photo || null,
    });

    await AsyncStorage.setItem('currentUser', JSON.stringify(res.data.data));
    await AsyncStorage.setItem('token', res.data.token);
  } catch (error: any) {
    console.log('error', error);
    if (error.code === statusCodes.SIGN_IN_CANCELLED) {
      // user cancelled the login flow
    } else if (error.code === statusCodes.IN_PROGRESS) {
      // operation (e.g. sign in) is in progress already
    } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
      // play services not available or outdated
    } else {
      // some other error happened
    }
  }
};

export const isSignedIn = async () => {
  const isSignedIn = await GoogleSignin.isSignedIn();
  return isSignedIn;
};

export const getCurrentUserInfo = async () => {
  try {
    const userInfo = await GoogleSignin.signInSilently();
    console.log('userInfo', userInfo);
  } catch (error: any) {
    if (error.code === statusCodes.SIGN_IN_REQUIRED) {
      // user has not signed in yet
    } else {
      // some other error
    }
  }
};

export const getCurrentUser = async () => {
  const currentUser = await GoogleSignin.getCurrentUser();
  console.log('currentUser', currentUser);
};

export const signOut = async () => {
  try {
    await GoogleSignin.signOut();
    await AsyncStorage.removeItem('currentUser');
    await AsyncStorage.removeItem('token');
  } catch (error) {
    console.error(error);
  }
};
