import {makeAutoObservable} from 'mobx';
import {api} from '../axios';
import {IChannel, IWatchVideo} from '../interface';

export class WatchStore {
  constructor() {
    makeAutoObservable(this);
  }

  // Loading
  isLoading = true;

  setIsLoading(isLoading: boolean) {
    this.isLoading = isLoading;
  }

  // Video
  video: IWatchVideo = {} as IWatchVideo;

  setVideo(video: IWatchVideo) {
    this.video = video;
  }

  async getVideo(videoId: string) {
    this.setIsLoading(true);
    this.setChannelLoading(true);

    const res = await api.video.getVideo(videoId);
    this.getChannel(res.data.data.userInfo._id);
    this.setVideo(res.data.data);

    this.setIsLoading(false);
  }

  // Channel
  channelLoading = false;

  setChannelLoading(channelLoading: boolean) {
    this.channelLoading = channelLoading;
  }

  channel: IChannel = {} as IChannel;

  setChannel(channel: IChannel) {
    this.channel = channel;
  }

  async getChannel(channelId: string) {
    this.setChannelLoading(true);
    const res = await api.user.getUser(channelId);

    this.setChannel(res.data.data);
    this.setChannelLoading(false);
  }
}
