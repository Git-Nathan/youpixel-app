import {axiosIntance} from '.';
import {VideoRequest} from '../interface';

export class VideoApi {
  getVideos() {
    return axiosIntance.get(`/videos`);
  }

  getVideo(id: string) {
    return axiosIntance.get(`/videos/${id}`);
  }

  getVideosBySearch(search_query: string, page: number) {
    return axiosIntance.get(
      `/videos/search?` +
        new URLSearchParams({
          search_query: search_query.trim(),
          page: page.toString(),
        }),
    );
  }

  getVideosTrending(page: number) {
    return axiosIntance.get(
      `/videos/topview?` +
        new URLSearchParams({
          page: page.toString(),
        }),
    );
  }

  getUserVideo(id: string, page: number) {
    return axiosIntance.get(
      `/videos/author?` +
        new URLSearchParams({
          page: page.toString(),
          id,
        }),
    );
  }

  getUserVideoPending(id: string, page: number) {
    return axiosIntance.get(
      `/videos/author/pending?` +
        new URLSearchParams({
          page: page.toString(),
          id,
        }),
    );
  }

  addVideo(video: VideoRequest) {
    return axiosIntance.post('/videos', video);
  }

  addView(id: string) {
    return axiosIntance.patch('/videos/addview/' + id);
  }

  editVideo(id: string, video: VideoRequest) {
    return axiosIntance.patch('/videos/' + id, video);
  }

  deleteVideo(id: string) {
    return axiosIntance.delete('/videos/' + id);
  }
}
