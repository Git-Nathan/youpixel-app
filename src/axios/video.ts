import {axiosIntance} from '.';

export class VideoApi {
  getVideos() {
    return axiosIntance.get(`/videos`);
  }
}
