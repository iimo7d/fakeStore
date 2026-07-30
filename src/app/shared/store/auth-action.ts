import { createActionGroup, emptyProps, props } from '@ngrx/store';

export const authAction = createActionGroup({
  source: 'Auth',
  events: {
    login: props<{ username: string; password: string }>(),
    loginSuccess: props<{ token: string }>(),
    LoginFailure: props<{ error: string }>(),

    register: props<{ id: number; email: string; username: string; password: string }>(),
    registerSuccess: emptyProps(),
    registerFailure: props<{ error: string }>(),
  },
});
