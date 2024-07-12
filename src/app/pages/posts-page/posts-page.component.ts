import { Component, OnInit } from '@angular/core';
import { PostComponent } from './post/post.component';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../../services/data.service';
import { map, Observable, switchMap, tap } from 'rxjs';
import { IPostWithUrl } from '../../shared/interfaces/posts';
import { AsyncPipe } from '@angular/common';
@Component({
  selector: 'app-posts-page',
  standalone: true,
  imports: [PostComponent, AsyncPipe],
  templateUrl: './posts-page.component.html',
  styleUrl: './posts-page.component.scss',
})
export class PostsPageComponent implements OnInit {
  userName: string = '';
  posts$!: Observable<IPostWithUrl[]>;

  constructor(
    private route: ActivatedRoute,
    private dataService: DataService
  ) {}
  ngOnInit(): void {
    this.posts$ = this.route.paramMap
      .pipe(
        switchMap((params) => {
          const id = params.get('id') as string;
          return this.dataService.getUsersById(id);
        })
      )
      .pipe(
        tap((user) => {
          this.userName = user.name;
        }),
        switchMap((user) => this.dataService.getPostByUserId(`${user.id}`)),
        map((posts) => {
          return posts.map((post) => ({
            ...post,
            imgUrl: `https://picsum.photos/400?random=${post.id}`,
          }));
        })
      );
  }
}
