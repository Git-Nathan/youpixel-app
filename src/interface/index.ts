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

export interface VideoRequest {
  userId: string;
  title: string;
  desc: string;
  duration: number;
  imgUrl: string;
  imgPath: string;
  videoUrl: string;
  videoPath: string;
  status: string;
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
  picture: string | null;
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
  __v: number;
}

export interface INumberOfLikes {
  liked: number;
  disliked: number;
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

export interface ICommentsResponse {
  data: IComment[];
  numberOfPages: number;
  total: number;
}

export interface ISearchResponse {
  data: IVideo[];
  numberOfPages: number;
  total: number;
}

export interface IComment {
  _id: string;
  userId: string;
  videoId: string;
  desc: string;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
  userInfo: IUserInfo;
}

export interface IRelatedSearch {
  _id: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}
