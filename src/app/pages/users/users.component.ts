import { Component, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { DataService } from '../../services/data.service';
import { AsyncPipe } from '@angular/common';
import { Observable } from 'rxjs';
import { StrSplitterPipe } from '../../shared/pipes/str-splitter.pipe';
import { LoadingAnimationComponent } from '../../shared/loading-animation/loading-animation.component';
import { ICols } from '../../shared/interfaces/cols';
import { IUser } from '../../shared/interfaces/user';
@Component({
  selector: 'app-users',
  standalone: true,
  imports: [TableModule, AsyncPipe, StrSplitterPipe, LoadingAnimationComponent],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss',
})
export class UsersComponent implements OnInit {
  users$!: Observable<IUser[]>;
  cols!: ICols[];
  constructor(private dataService: DataService) {}
  ngOnInit(): void {
    this.users$ = this.dataService.getUsers();
    this.initCols();
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
