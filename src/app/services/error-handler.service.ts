import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ErrorHandlerService {
  errorMsg$ = new BehaviorSubject<{ error: string | null }>({
    error: null,
  });
  constructor() {}
}
