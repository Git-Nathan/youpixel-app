import {axiosIntance} from '.';
import {IVideo} from '../interface';

export class VideoApi {
  getVideos() {
    return axiosIntance.get(`/videos`);
  }

  getVideo(id: string) {
    return axiosIntance.get(`/videos/${id}`);
  }

  getVideosTrending(page: number) {
    return axiosIntance.get(
      `/videos/topview` +
        new URLSearchParams({
          page: page.toString(),
        }),
    );
  }

  getUserVideo(id: string, page: number) {
    return axiosIntance.get(
      `/videos/author` +
        new URLSearchParams({
          page: page.toString(),
          id,
        }),
    );
  }

  getUserVideoPending(id: string, page: number) {
    return axiosIntance.get(
      `/videos/author/pending` +
        new URLSearchParams({
          page: page.toString(),
          id,
        }),
    );
  }

  addVideo(video: IVideo) {
    return axiosIntance.post('/videos', video);
  }

  addView(id: string) {
    return axiosIntance.patch('/videos/addview' + id);
  }

  editVideo(id: string, video: IVideo) {
    return axiosIntance.patch('/videos' + id, video);
  }

  deleteVideo(id: string) {
    return axiosIntance.delete('/videos/' + id);
  }
}
