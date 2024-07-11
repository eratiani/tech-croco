import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'user',
    loadComponent: () =>
      import('../../pages/users/users.component').then((a) => a.UsersComponent),
  },
  {
    path: 'post',
    loadComponent: () =>
      import('../../pages/posts/posts.component').then((a) => a.PostsComponent),
  },
  {
    path: 'post/:id',
    loadComponent: () =>
      import('../../pages/posts-page/posts-page.component').then(
        (a) => a.PostsPageComponent
      ),
  },
];
