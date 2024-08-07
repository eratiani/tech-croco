import { ChangeDetectionStrategy, Component } from '@angular/core';
import { forkJoin, map, Observable } from 'rxjs';
import { DataService } from '../../services/data.service';
import { ICols } from '../../shared/interfaces/cols';
import { TableModule } from 'primeng/table';
import { AsyncPipe } from '@angular/common';
import { StrSplitterPipe } from '../../shared/pipes/str-splitter.pipe';
import { LoadingAnimationComponent } from '../../shared/components/loading-animation/loading-animation.component';
import { ButtonModule } from 'primeng/button';
import { IUserWithPost } from '../../shared/interfaces/user';
import { DialogModule } from 'primeng/dialog';
import { IPost } from '../../shared/interfaces/posts';
@Component({
  selector: 'app-posts',
  standalone: true,
  imports: [
    TableModule,
    AsyncPipe,
    StrSplitterPipe,
    LoadingAnimationComponent,
    ButtonModule,
    DialogModule,
  ],
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostsComponent {
  displayDialog: boolean = false;
  postDetail!: IPost;
  posts$!: Observable<IUserWithPost[]>;
  cols!: ICols[];
  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.initCols();
    this.posts$ = this.getUsersWithPosts();
  }
  showDetailsPopup(post: IPost) {
    this.displayDialog = true;
    this.postDetail = post;
  }
  getUsersWithPosts(): Observable<
    { userName: string; arrayOfPosts: IPost[] }[]
  > {
    return forkJoin({
      users: this.dataService.getUsers(),
      posts: this.dataService.getPosts(),
    }).pipe(
      map(({ users, posts }) => {
        return users.map((user) => ({
          userName: user.name,
          arrayOfPosts: posts.filter((post) => post.userId === user.id),
        }));
      })
    );
  }
  initCols() {
    this.cols = [
      {
        field: 'userName',
        header: 'მომხმარებლის სახელი',
      },
      {
        field: 'title',
        header: 'პოსტის სათაური',
      },
    ];
  }
}
