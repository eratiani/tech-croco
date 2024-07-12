import { Component, Input, OnDestroy, OnInit, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';

import { debounceTime, distinctUntilChanged, Subject, takeUntil } from 'rxjs';
import { SearchPrompt } from './search.model';
import { IUser } from '../../shared/interfaces/user';
import { SearchService } from '../../services/search.service';
@Component({
  selector: 'app-search',
  standalone: true,
  imports: [
    FormsModule,
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule,
    ReactiveFormsModule,
  ],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
})
export class SearchComponent implements OnInit, OnDestroy {
  fb = inject(FormBuilder);
  searchPrompt: string[] = ['First Name', 'Last Name', 'Email'];
  searchParameter!: string;
  searchForm!: FormGroup;
  destroy$!: Subject<void>;
  searchBy = SearchPrompt[1];
  @Input() usersArr!: IUser[];
  constructor(private searchService: SearchService) {}

  ngOnInit(): void {
    this.initForm();
    this.searchForm.get('searchSelect')?.valueChanges.subscribe((value) => {
      this.searchBy = this.formatSearchQuery(value);
    });
    this.searchForm
      .get('searchParameter')
      ?.valueChanges.pipe(
        debounceTime(300),
        distinctUntilChanged(),
        takeUntil(this.destroy$)
      )
      .subscribe((response) => {
        const param = this.searchBy;
        this.searchService.updateFilter({ [param]: response });
      });
  }
  ngOnDestroy(): void {
    this.destroy$.next();
  }
  initForm() {
    this.searchForm = this.fb.group({
      searchSelect: [this.searchPrompt[0]],
      searchParameter: [''],
    });
  }
  formatSearchQuery(str: string) {
    switch (str) {
      case 'First Name':
        return 'firstName';
      case 'Last Name':
        return 'lastName';
      case 'Email':
        return 'email';
      default:
        return 'firstName';
    }
  }
  filterArrayWitHQuery(users: IUser[], query: string, parameter: keyof IUser) {
    return users.filter(
      (user) => String(user[parameter]).toLowerCase().indexOf(query) === 0
    );
  }
}
