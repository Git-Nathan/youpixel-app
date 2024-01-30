import {makeAutoObservable} from 'mobx';

export class WatchStore {
  constructor() {
    makeAutoObservable(this);
  }

  // Loading
  isLoading = false;

  setIsLoading(isLoading: boolean) {
    this.isLoading = isLoading;
  }
}
