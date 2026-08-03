import { createActionGroup, props } from '@ngrx/store';
import { UserProfile } from '../types/profile-type';

export const profileActions = createActionGroup({
  source: 'Profile',
  events: {
    loadProfile: props<{ userId: number }>(),
    loadProfileSuccess: props<{ profile: UserProfile }>(),
    loadProfileFailure: props<{ error: string }>(),
  },
});
