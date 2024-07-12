import { Component, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { DataService } from '../../services/data.service';
import { AsyncPipe } from '@angular/common';
import {
  combineLatest,
  filter,
  map,
  Observable,
  Subscription,
  tap,
} from 'rxjs';
import { StrSplitterPipe } from '../../shared/pipes/str-splitter.pipe';
import { LoadingAnimationComponent } from '../../shared/components/loading-animation/loading-animation.component';
import { ICols } from '../../shared/interfaces/cols';
import { IModifiedUser, IUser } from '../../shared/interfaces/user';
import { ButtonModule } from 'primeng/button';
import { Router } from '@angular/router';
import { SearchComponent } from '../search/search.component';
import { SearchService } from '../../services/search.service';
@Component({
  selector: 'app-users',
  standalone: true,
  imports: [
    TableModule,
    AsyncPipe,
    StrSplitterPipe,
    LoadingAnimationComponent,
    ButtonModule,
    SearchComponent,
  ],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss',
})
export class UsersComponent implements OnInit {
  users$!: Observable<IUser[]>;
  cols!: ICols[];
  filterUserAction$ = this.searchService.filterUsersAction$;
  filtredUsers$!: Observable<IModifiedUser[]>;
  constructor(
    private dataService: DataService,
    private router: Router,
    private searchService: SearchService
  ) {}
  ngOnInit(): void {
    this.users$ = this.dataService.getUsers();
    this.filtredUsers$ = combineLatest([
      this.users$,
      this.filterUserAction$,
    ]).pipe(
      map(([users, filter]) => {
        const newUsers: IModifiedUser[] = users.map((user) => {
          return {
            ...user,
            lastName: this.getNameOrSurname(user.name, 'lastName'),
            firstName: this.getNameOrSurname(user.name, 'firstName'),
          };
        });
        return [newUsers, filter];
      }),
      map(([users, filter]) => {
        type filterProp = Pick<
          IModifiedUser,
          'firstName' | 'lastName' | 'email'
        >;
        const property = Object.keys(filter)[0] as keyof filterProp;
        const value = Object.values(filter)[0];
        const usersArr = users as IModifiedUser[];
        return usersArr.filter(
          (user) =>
            user[property].toLowerCase().indexOf(value.toLowerCase()) === 0
        );
      })
    );

    this.initCols();
  }
  getNameOrSurname(username: string, type: string) {
    let userArr = username.split(' ');
    if (username === 'Nicholas Runolfsdottir V') {
      userArr = [userArr[0], userArr[1]];
    }
    if (type === 'lastName') {
      return userArr[userArr.length - 1];
    }
    return userArr[userArr.length - 2];
  }
  onNavigateToPosts(id: number) {
    this.router.navigateByUrl(`home/post/${id}`);
  }
  initCols() {
    this.cols = [
      {
        field: 'name',
        header: 'სახელი',
      },
      {
        field: 'name',
        header: 'გვარი',
      },
      {
        field: 'phone',
        header: 'ტელეფონის ნომერი',
      },
      {
        field: 'email',
        header: 'მეილი',
      },
      {
        field: 'company',
        property: 'name',
        header: 'კომპანიის დასახელება',
      },
    ];
  }
}
