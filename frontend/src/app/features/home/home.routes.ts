import { Routes } from '@angular/router';

export const homeRoutes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadComponent: () => import('./home').then((m) => m.Home),
  },
];
