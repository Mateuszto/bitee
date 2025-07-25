export const authRoutes = [
   {
      path: '',
      loadComponent: () => import('./login').then((m) => m.LoginComponent),
   },
];
