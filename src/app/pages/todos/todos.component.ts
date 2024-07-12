import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, switchMap, tap, map } from 'rxjs';
import { DataService } from '../../services/data.service';
import { TodoComponent } from './todo/todo.component';
import { AsyncPipe } from '@angular/common';
import { NavigationComponent } from '../../shared/components/navigation/navigation.component';
import { ITodo } from '../../shared/interfaces/todos';
import { LoadingAnimationComponent } from '../../shared/components/loading-animation/loading-animation.component';

@Component({
  selector: 'app-todos',
  standalone: true,
  imports: [
    TodoComponent,
    AsyncPipe,
    NavigationComponent,
    LoadingAnimationComponent,
  ],
  templateUrl: './todos.component.html',
  styleUrl: './todos.component.scss',
})
export class TodosComponent {
  userName: string = '';
  todos$!: Observable<ITodo[]>;

  constructor(
    private route: ActivatedRoute,
    private dataService: DataService
  ) {}
  ngOnInit(): void {
    this.todos$ = this.route.paramMap
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
        switchMap((user) => this.dataService.getTodoByUserId(`${user.id}`)),
        map((posts) => {
          return posts.map((post) => ({
            ...post,
            imgUrl: `https://picsum.photos/400?random=${post.id}`,
          }));
        })
      );
  }
}
