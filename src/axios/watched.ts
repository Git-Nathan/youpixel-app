import {axiosIntance} from '.';

export class WatchedApi {
  getWatchedVideos(page: number) {
    return axiosIntance.get(
      `/videos/watched?` +
        new URLSearchParams({
          page: page.toString(),
        }),
    );
  }

  addWatchedVideo(videoId: string) {
    return axiosIntance.post(`/videos/watched/${videoId}`);
  }
}
