import { AsyncPipe, DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Observable, timer, map, shareReplay } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [DatePipe, RouterModule, AsyncPipe],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  private _time$: Observable<Date> = timer(0, 1000).pipe(
    map((tick) => new Date()),
    shareReplay(1)
  );

  get time() {
    return this._time$;
  }
}
