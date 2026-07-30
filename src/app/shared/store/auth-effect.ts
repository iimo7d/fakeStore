import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthApi } from '../services/auth-api';
import { Router } from '@angular/router';
import { authAction } from './auth-action';
import { catchError, map, of, switchMap } from 'rxjs';

export const loginEffect = createEffect(
  (actions = inject(Actions), authApi = inject(AuthApi), router = inject(Router)) => {
    return actions.pipe(
      ofType(authAction.login),
      switchMap((LoginRequest) => {
        return authApi.login(LoginRequest).pipe(
          map((response) => {
            router.navigateByUrl('/product');
            return authAction.loginSuccess({ token: response.token });
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
