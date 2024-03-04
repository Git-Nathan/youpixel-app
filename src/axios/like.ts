import {axiosIntance} from '.';

export class LikeApi {
  getNumberOfLikes(videoId: string) {
    return axiosIntance.get(`/like/num/${videoId}`);
  }

  getLikeStatus(videoId: string) {
    return axiosIntance.get(`/like/status/${videoId}`);
  }

  like(videoId: string) {
    return axiosIntance.post(`/like/like/${videoId}`);
  }

  dislike(videoId: string) {
    return axiosIntance.post(`/like/dislike/${videoId}`);
  }

  unlike(videoId: string) {
    return axiosIntance.post(`/like/unlike/${videoId}`);
  }
}
