import {makeAutoObservable} from 'mobx';
import {api} from '../axios';
import {
  IChannel,
  ICommentsResponse,
  INumberOfLikes,
  IWatchVideo,
} from '../interface';

export class WatchStore {
  constructor() {
    makeAutoObservable(this);
  }

  // Video
  isLoading = true;

  setIsLoading(isLoading: boolean) {
    this.isLoading = isLoading;
  }

  video: IWatchVideo = {} as IWatchVideo;

  setVideo(video: IWatchVideo) {
    this.video = video;
  }

  async getDetail(videoId: string) {
    this.setIsLoading(true);
    this.setChannelLoading(true);
    this.setLikeLoading(true);
    this.setCommentLoading(true);

    try {
      const res = await api.video.getVideo(videoId);

      // Get using ChannelId
      this.getChannel(res.data.data.userInfo._id);

      this.setVideo(res.data.data);
    } catch (error) {
      console.log('error', error);
    } finally {
      this.setIsLoading(false);
    }
  }

  // Channel
  channelLoading = true;

  setChannelLoading(channelLoading: boolean) {
    this.channelLoading = channelLoading;
  }

  channel: IChannel = {} as IChannel;

  setChannel(channel: IChannel) {
    this.channel = channel;
  }

  async getChannel(channelId: string) {
    try {
      const res = await api.user.getUser(channelId);

      this.setChannel(res.data.data);
    } catch (error) {
      console.log('error', error);
    } finally {
      this.setChannelLoading(false);
    }
  }

  // Like
  likeLoading = true;

  setLikeLoading(likeLoading: boolean) {
    this.likeLoading = likeLoading;
  }

  likeStatus: null | boolean = null;

  setLikeStatus(likeStatus: null | boolean) {
    this.likeStatus = likeStatus;
  }

  numberOfLikes: INumberOfLikes = {} as INumberOfLikes;

  setNumberOfLikes(numberOfLikes: INumberOfLikes) {
    this.numberOfLikes = numberOfLikes;
  }

  async getNumberOfLikes(videoId: string) {
    try {
      const res = await api.like.getNumberOfLikes(videoId);

      this.setNumberOfLikes(res.data.data);
    } catch (error) {
      console.log('error', error);
    } finally {
      this.setLikeLoading(false);
    }
  }

  // Comment
  commentLoading: boolean = true;

  setCommentLoading(commentLoading: boolean) {
    this.commentLoading = commentLoading;
  }

  comment: ICommentsResponse[] = [];

  setComment(comment: ICommentsResponse[]) {
    this.comment = comment;
  }

  async getComment(videoId: string, page: number) {
    try {
      const res = await api.comment.getComments(videoId, page);

      this.setComment = res.data;
    } catch (error) {
      console.log('error', error);
    } finally {
      this.setCommentLoading(false);
    }
  }
}
