import axios from 'axios';
import {VideoApi} from './video';

// export const axiosIntance = axios.create({ baseURL: 'https://youpixel-api.onrender.com/' })
export const axiosIntance = axios.create({
  baseURL: 'https://f28b-118-70-56-13.ngrok-free.app/',
});

const video = new VideoApi();

export const api = {video};
