import axios from 'axios';
import {makeAutoObservable} from 'mobx';
import {IVideo} from '../interface';

export class VideosStore {
  constructor() {
    makeAutoObservable(this);
  }

  // Video list
  isLoading = false;

  setIsLoading(isLoading: boolean) {
    this.isLoading = isLoading;
  }

  videoList: IVideo[] = [];

  setVideoList(videoList: IVideo[]): void {
    this.videoList = videoList;
  }

  async getVideoList() {
    this.setIsLoading(true);
    try {
      const res = await axios.get('https://youpixel-api.onrender.com/videos');

      this.setVideoList(res.data.data);
    } catch (error) {
      console.log('error', error);
    } finally {
      this.setIsLoading(false);
    }
  }
}
