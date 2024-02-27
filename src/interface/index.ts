export interface IVideo {
  _id: string;
  userId: string;
  title: string;
  desc: string;
  duration: number;
  imgUrl: string;
  imgPath: string;
  views: number;
  createdAt: Date;
  updatedAt: Date;
  userObjectId: string;
  userInfo: IUserInfo;
}

export interface IUserInfo {
  _id: string;
  name: string;
  role: string;
  picture: string;
}

export interface IIcon {
  width?: string;
  height?: string;
  className?: string;
}

export interface ISigninData {
  name: string;
  email: string;
  picture: string;
}

export interface IWatchVideo {
  _id: string;
  userId: string;
  title: string;
  desc: string;
  duration: number;
  imgUrl: string;
  imgPath: string;
  videoUrl: string;
  videoPath: string;
  views: number;
  status: string;
  createdAt: Date;
  updatedAt: Date;
  userInfo: IUserInfo;
  comment: Comment;
}

export interface Comment {
  _id: string;
  userId: string;
  videoId: string;
  desc: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IChannel {
  _id: string;
  name: string;
  email: string;
  picture: string;
  createdAt: Date;
  updatedAt: Date;
  numOfSubscriber: number;
}
