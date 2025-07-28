export const registerRoutes = [
   {
      path: '',
      loadComponent: () => import('./register').then((m) => m.RegisterComponent),
   },
];
