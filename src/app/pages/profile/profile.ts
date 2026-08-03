import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Store } from '@ngrx/store';

import { authFeature } from '../../shared/store/auth-feature';
import { ProfileMap } from './profile-map';
import { profileActions } from './store/profile-actions';
import { profileFeature } from './store/profile-feture';

@Component({
  selector: 'app-profile',
  imports: [ProfileMap],
  templateUrl: './profile.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Profile implements OnInit {
  private readonly store = inject(Store);

  protected readonly profile = toSignal(
    this.store.select(profileFeature.selectProfile),
    { initialValue: null },
  );

  protected readonly isLoading = toSignal(
    this.store.select(profileFeature.selectIsLoading),
    { initialValue: false },
  );

  protected readonly error = toSignal(
    this.store.select(profileFeature.selectError),
    { initialValue: null },
  );

  ngOnInit(): void {
    const userId = this.store.selectSignal(
      authFeature.selectUserId,
    )();

    if (userId !== null) {
      this.store.dispatch(
        profileActions.loadProfile({ userId }),
      );
    }
  }
}
