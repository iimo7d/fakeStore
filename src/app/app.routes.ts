import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: 'login', loadComponent: () => import('./pages/login/login').then((m) => m.Login) },
  {
    path: 'register',
    loadComponent: () => import('./pages/register/register').then((m) => m.Register),
  },
  {
    path: '',
    loadComponent: () => import('./pages/main-layout').then((m) => m.MainLayout),
    canActivate:[],
    children: [
      { path: 'cart', loadComponent: () => import('./pages/cart/cart').then((m) => m.Cart) },
      {
        path: 'profile',
        loadComponent: () => import('./pages/profile/profile').then((m) => m.Profile),
      },
      {
        path: 'product',
        loadComponent: () => import('./pages/product/product').then((m) => m.Product),
      },
    ],
  },
];
