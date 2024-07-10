import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IUser } from '../shared/interfaces/user';
import { IPost } from '../shared/interfaces/posts';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private http: HttpClient) {}
  getUsers() {
    return this.http.get<IUser[]>('https://jsonplaceholder.typicode.com/users');
  }
  getPosts() {
    return this.http.get<IPost[]>('https://jsonplaceholder.typicode.com/posts');
  }
  getPostByUserId(id: string) {
    return this.http.get<IPost[]>(
      `https://jsonplaceholder.typicode.com/posts?postId=${id}`
    );
  }
}
