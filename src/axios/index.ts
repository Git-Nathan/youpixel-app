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
  baseURL: 'https://2847-118-70-56-13.ngrok-free.app/',
});

const video = new VideoApi();
const like = new LikeApi();
const search = new SearchApi();
const subscribe = new SubscribeApi();
const user = new UserApi();
const watched = new WatchedApi();
const comment = new CommentApi();

export const api = {video, like, search, subscribe, user, watched, comment};
