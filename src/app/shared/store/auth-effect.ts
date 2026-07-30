import { extractToken, Payload } from './../util/extractToken';
import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthApi } from '../services/auth-api';
import { Router } from '@angular/router';
import { authAction } from './auth-action';
import { catchError, map, of, switchMap } from 'rxjs';
import { MyStorage } from '../services/storage';

export const loginEffect = createEffect(
  (
    actions = inject(Actions),
    authApi = inject(AuthApi),
    router = inject(Router),
    storage = inject(MyStorage),
  ) => {
    return actions.pipe(
      ofType(authAction.login),
      switchMap((LoginRequest) => {
        return authApi.login(LoginRequest).pipe(
          map((response) => {
            router.navigateByUrl('/product');

            storage.setItem('ngrx_token', response.token);
            const payload = extractToken(response.token);
            console.log('decoded token payload', payload);

            if (payload) {
              return authAction.loginSuccess({ token: response.token, userId: payload?.sub });
            } else {
              return authAction.loginSuccess({ token: response.token, userId: null });
            }
          }),
          catchError((error) => {
            return of(authAction.loginFailure({ error: error.message }));
          }),
        );
      }),
    );
  },
  { functional: true },
);

export const registerEffect = createEffect(
  (actions = inject(Actions), authApi = inject(AuthApi), router = inject(Router)) => {
    return actions.pipe(
      ofType(authAction.register),
      switchMap((registerRequest) =>
        authApi.register(registerRequest).pipe(
          map(() => {
            router.navigateByUrl('/login');
            return authAction.registerSuccess();
          }),
          catchError((error) =>
            of(
              authAction.registerFailure({
                error: error.error?.message ?? error.message ?? 'Registration failed',
              }),
            ),
          ),
        ),
      ),
    );
  },
  { functional: true },
);
