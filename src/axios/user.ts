import {axiosIntance} from '.';
import {ISigninData} from '../interface';

export class UserApi {
  getUser(id: string) {
    return axiosIntance.get(`/users/` + id);
  }

  signinWithGoogle(data: ISigninData) {
    return axiosIntance.post(`/users/google`, data);
  }
}
