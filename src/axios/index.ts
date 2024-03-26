import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {CommentApi} from './comment';
import {LikeApi} from './like';
import {SearchApi} from './search';
import {SubscribeApi} from './subscribe';
import {UserApi} from './user';
import {VideoApi} from './video';
import {WatchedApi} from './watched';

// export const axiosIntance = axios.create({ baseURL: 'https://youpixel-api.onrender.com/' })
export const axiosIntance = axios.create({
  baseURL: 'http://192.168.1.182:5002/',
});

axiosIntance.interceptors.request.use(async req => {
  const value = await AsyncStorage.getItem('token');
  if (value !== null) {
    req.headers.Authorization = value;
  }

  return req;
});

const video = new VideoApi();
const like = new LikeApi();
const search = new SearchApi();
const subscribe = new SubscribeApi();
const user = new UserApi();
const watched = new WatchedApi();
const comment = new CommentApi();

export const api = {video, like, search, subscribe, user, watched, comment};
