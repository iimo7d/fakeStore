import { createFeature, createReducer, on } from '@ngrx/store';
import { authAction } from './auth-action';

export type AuthState = {
  token: string | null;
  userId: string | null;
  error: string | null;
  isLoading: boolean;
};

export const initialAuthState: AuthState = {
  token: null,
  userId: null,
  error: null,
  isLoading: false,
};

export const authFeature = createFeature({
  name: 'auth',
  reducer: createReducer(
    initialAuthState,
    on(authAction.loginSuccess, (state, { token }) => ({
      ...state,
      token,
      isLoading: false,
    })),

    on(authAction.loginFailure, (state, { error }) => ({
      ...state,
      token: null,
      error,
      isLoading: false,
    })),

    on(authAction.login, (state) => ({
      ...state,
      isLoading: true,
      error: null,
    })),

    on(authAction.logout, () => initialAuthState),

    on(authAction.register, (state) => ({
      ...state,
      isLoading: true,
      error: null,
    })),

    on(authAction.loginSuccess, (state) => ({
      ...state,
      isLoading: false,
    })),

    on(authAction.registerSuccess, (state) => ({
      ...state,
      isLoading: false,
    })),

    on(authAction.registerFailure, (state, { error }) => ({
      ...state,
      isLoading: false,
      error,
    })),
  ),
});
