import {axiosIntance} from '.';

export class SubscribeApi {
  subscribe(channelId: string) {
    return axiosIntance.post(`/subscribe/${channelId}`);
  }

  unsubscribe(channelId: string) {
    return axiosIntance.delete(`/subscribe/${channelId}`);
  }
}
