import {
  ApplicationConfig,
  InjectionToken,
  provideBrowserGlobalErrorListeners,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideEffects } from '@ngrx/effects';
import { provideState, provideStore } from '@ngrx/store';
import { provideHotToastConfig } from '@ngxpert/hot-toast';

import { routes } from './app.routes';
import { authFeature } from './shared/store/auth-feature';

import * as loginEffect from './shared/store/auth-effect';

export const API_URL = new InjectionToken<string>('API_URL');

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideStore(),
    provideEffects(loginEffect),
    provideState(authFeature),
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
