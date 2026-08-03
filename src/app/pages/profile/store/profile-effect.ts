import { Actions, createEffect, ofType } from '@ngrx/effects';
import { profileActions } from './profile-actions';
import { inject } from '@angular/core';
import { switchMap, map, catchError, of } from 'rxjs';
import { ProfileApi } from '../services/profile-api';

export const profileEffect = createEffect(
  (action$ = inject(Actions), profileApi = inject(ProfileApi)) => {
    return action$.pipe(
      ofType(profileActions.loadProfile),
      switchMap(({ userId }) => {
        return profileApi.getUserProfile(userId).pipe(
          map((profile) => profileActions.loadProfileSuccess({ profile })),
          catchError((error) => of(profileActions.loadProfileFailure({ error: error.message }))),
        );
      }),
    );
  },
  {
    functional: true,
  }
);
