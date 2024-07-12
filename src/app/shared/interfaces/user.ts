import { IPost } from './posts';

export interface IUser {
  id: number;
  name: string;
  username: string;
  email: string;
  address: IAdress;
  phone: string;
  website: string;
  company: ICompany;
}
interface IAdress {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: ILocation;
}
interface ILocation {
  lat: string;
  lng: string;
}
interface ICompany {
  name: string;
  catchPhrase: string;
  bs: string;
}

export interface IUserWithPost {
  userName: string;
  arrayOfPosts: IPost[];
}

export interface IModifiedUser extends IUser {
  firstName: string;
  lastName: string;
}
