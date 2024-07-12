import { Injectable } from '@angular/core';
import { IModifiedUser, IUser } from '../shared/interfaces/user';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  private filterUserSubject = new BehaviorSubject<Partial<IModifiedUser>>({
    firstName: '',
  });

  filterUsersAction$ = this.filterUserSubject.asObservable();

  updateFilter(filterCriteria: Partial<IUser>) {
    this.filterUserSubject.next(filterCriteria);
  }
  constructor() {}
}
