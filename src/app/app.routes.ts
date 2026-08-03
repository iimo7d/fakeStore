import { Routes } from '@angular/router';
import { provideState } from '@ngrx/store';
import { productFeature } from './pages/product/store/product-feature';
import { provideEffects } from '@ngrx/effects';
import * as productEffect from './pages/product/store/product-effect';
import { profileFeature } from './pages/profile/store/profile-feture';
import * as profileEffects from './pages/profile/store/profile-effect';
import { authGuard } from './core/guards/auth-guard';

export const routes: Routes = [
  { path: 'login', loadComponent: () => import('./pages/login/login').then((m) => m.Login) },
  {
    path: 'register',
    loadComponent: () => import('./pages/register/register').then((m) => m.Register),
  },
  {
    path: '',
    loadComponent: () => import('./pages/main-layout').then((m) => m.MainLayout),
    canActivate: [],
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'product',
      },
      {
        path: 'cart',
        canActivate: [authGuard],
        loadComponent: () => import('./pages/cart/cart').then((m) => m.Cart),
      },
      {
        path: 'profile',
        canActivate: [authGuard],
        loadComponent: () => import('./pages/profile/profile').then((m) => m.Profile),
        providers: [provideState(profileFeature), provideEffects(profileEffects)],
      },
      {
        path: 'product',
        loadComponent: () => import('./pages/product/product').then((m) => m.Product),
        providers: [provideState(productFeature), provideEffects(productEffect)],
      },
    ],
  },
];
