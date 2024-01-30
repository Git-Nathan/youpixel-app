import {makeAutoObservable} from 'mobx';
import {api} from '../axios';
import {IVideo} from '../interface';

export class VideosStore {
  constructor() {
    makeAutoObservable(this);
  }

  // Loading
  isLoading = false;

  setIsLoading(isLoading: boolean) {
    this.isLoading = isLoading;
  }

  // Search
  searchQuery = '';

  setSearchQuery(query: string) {
    this.searchQuery = query;
  }

  openSearchBar = false;

  handleOpenSearchBar() {
    this.openSearchBar = true;
  }

  handleCloseSearchBar() {
    this.openSearchBar = false;
  }

  // Video list
  videoList: IVideo[] = [];

  setVideoList(videoList: IVideo[]): void {
    this.videoList = videoList;
  }

  async getVideoList() {
    this.setIsLoading(true);
    try {
      const res = await api.video.getVideos();

      this.setVideoList(res.data.data);
    } catch (error) {
      console.log('error', error);
    } finally {
      this.setIsLoading(false);
    }
  }
}
