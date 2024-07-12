import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './shared/components/header/header.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { NavigationComponent } from './shared/components/navigation/navigation.component';
import { HomeComponent } from './pages/home/home.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ErrorHandlerService } from './services/error-handler.service';
import { Subject, takeUntil, tap } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    HeaderComponent,
    FooterComponent,
    NavigationComponent,
    HomeComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'tech-task';
  destroy$!: Subject<void>;
  constructor(
    private snackBar: MatSnackBar,
    private errorHandler: ErrorHandlerService
  ) {}

  ngOnInit(): void {
    this.errorHandler.errorMsg$
      .pipe(
        tap((error) => {
          if (error.error) {
            this.snackBar.open(error.error, '', {
              duration: 2000,
              panelClass: ['custom-snackbar', 'snackbar-error'],
            });
          }
        }),
        takeUntil(this.destroy$)
      )
      .subscribe({
        next(value) {},
      });
  }
  ngOnDestroy(): void {
    this.destroy$.next();
  }
}
