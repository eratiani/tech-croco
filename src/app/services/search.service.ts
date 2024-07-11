import { Injectable } from '@angular/core';
import { IUser } from '../shared/interfaces/user';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  private filterUserSubject = new BehaviorSubject<Partial<IUser>>({ name: '' });

  filterUsersAction$ = this.filterUserSubject.asObservable();

  updateFilter(filterCriteria: Partial<IUser>) {
    this.filterUserSubject.next(filterCriteria);
  }
  constructor() {}
}
