import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IUser } from '../shared/interfaces/user';
import { IPost } from '../shared/interfaces/posts';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private http: HttpClient) {}
  getUsers() {
    return this.http.get<IUser[]>(`${environment.DATAURL}users`);
  }
  getUsersById(id: string) {
    return this.http.get<IUser>(`${environment.DATAURL}users/${id}`);
  }
  getPosts() {
    return this.http.get<IPost[]>(`${environment.DATAURL}posts`);
  }
  getPostByUserId(id: string) {
    return this.http.get<IPost[]>(`${environment.DATAURL}posts?userId=${id}`);
  }
}
