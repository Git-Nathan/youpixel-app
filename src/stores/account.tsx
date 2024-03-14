import AsyncStorage from '@react-native-async-storage/async-storage';
import {makeAutoObservable} from 'mobx';
import {IUserInfo} from '../interface';

export class AccountStore {
  constructor() {
    makeAutoObservable(this);
  }

  isLoading = true;

  setIsLoading(isLoading: boolean) {
    this.isLoading = isLoading;
  }

  currentUser: IUserInfo = {} as IUserInfo;

  setCurrentUser(user: IUserInfo) {
    this.currentUser = user;
  }

  isSignedIn = false;

  setIsSignedIn(isSignedIn: boolean) {
    this.isSignedIn = isSignedIn;
  }

  async getUserFromStorage() {
    this.setIsLoading(true);
    try {
      const jsonValue = await AsyncStorage.getItem('currentUser');
      if (jsonValue) {
        const currentUser = JSON.parse(jsonValue);
        this.setCurrentUser(currentUser);
        this.setIsSignedIn(true);
      } else {
        this.setCurrentUser({} as IUserInfo);
        this.setIsSignedIn(false);
      }
    } catch (error) {
      console.log('error', error);
    } finally {
      this.setIsLoading(false);
    }
  }
}
