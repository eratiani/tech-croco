export interface IPost {
  userId: number;
  id: number;
  title: string;
  body: string;
}
export interface IPostWithUrl extends IPost {
  imgUrl: string;
}
