import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home/user',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: HomeComponent,
    loadChildren: () =>
      import('./shared/components/navigation/navigation.routes').then(
        (nav) => nav.routes
      ),
  },
];
