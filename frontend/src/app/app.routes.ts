import { Routes } from '@angular/router';

export const routes: Routes = [
   {
      path: '',
      loadChildren: () => import('./features/home/home.routes').then((m) => m.homeRoutes),
   },
   {
      path: 'login',
      loadChildren: () => import('./features/login/login.routes').then((m) => m.authRoutes),
   },
];
