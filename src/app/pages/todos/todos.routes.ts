import { Routes } from '@angular/router';

export const routes: Routes = [
  
 
  {
    path: ':id',
    loadComponent: () =>
      import('./todo).then(
        (a) => a.PostsPageComponent
      ),
  },
];
