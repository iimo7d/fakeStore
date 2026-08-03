import {
  ApplicationConfig,
  InjectionToken,
  provideAppInitializer,
  provideBrowserGlobalErrorListeners,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideEffects } from '@ngrx/effects';
import { provideState, provideStore } from '@ngrx/store';
import { provideHotToastConfig } from '@ngxpert/hot-toast';

import { routes } from './app.routes';
import { authFeature } from './shared/store/auth-feature';
import { productFeature } from './pages/product/store/product-feature';
import { cartFeature } from './pages/cart/stores/cart-feature';

import * as loginEffect from './shared/store/auth-effect';
import * as productEffects from './pages/product/store/product-effect';
import * as cartEffects from './pages/cart/stores/cart-effect';
import { restoreAuthSession } from './shared/store/auth-initializer';

export const API_URL = new InjectionToken<string>('API_URL');

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideAppInitializer(restoreAuthSession),
    provideRouter(routes),
    provideStore(),
    provideEffects(loginEffect),
    provideEffects(productEffects),
    provideEffects(cartEffects),
    provideState(authFeature),
    provideState(productFeature),
    provideState(cartFeature),
    {
      provide: API_URL,
      useValue: 'https://fakestoreapi.com/',
    },
    provideHotToastConfig({
      position: 'top-right',
      duration: 2500,
      dismissible: true,
      theme: 'ios',
      usePopover: false,
    }),
  ],
};

// https://fakestoreapi.com/
