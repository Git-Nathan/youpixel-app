import {axiosIntance} from '.';

export class SubscribeApi {
  subscribe(channelId: string) {
    return axiosIntance.post(`/subscribe/${channelId}`);
  }

  unsubscribe(channelId: string) {
    return axiosIntance.delete(`/subscribe/${channelId}`);
  }

  getStatus(channelId: string) {
    return axiosIntance.get(`/subscribe/${channelId}`);
  }

  getSubscribedVideos(page: number) {
    return axiosIntance.get(
      `/subscribe/subscribed?` +
        new URLSearchParams({
          page: page.toString(),
        }),
    );
  }
}
