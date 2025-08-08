export const loginRoutes = [
   {
      path: '',
      loadComponent: () => import('./login').then((m) => m.LoginComponent),
   },
];
