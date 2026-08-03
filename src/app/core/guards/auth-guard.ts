import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { HotToastService } from '@ngxpert/hot-toast';
import { map, take } from 'rxjs';

import { selectIsLoggedIn } from '../../shared/store/auth-feature';

export const authGuard: CanActivateFn = () => {
  const store = inject(Store);
  const router = inject(Router);
  const toast = inject(HotToastService);

  return store.select(selectIsLoggedIn).pipe(
    take(1),
    map((isLoggedIn) => {
      if (isLoggedIn) {
        return true;
      }

      toast.info('Please log in to continue.');
      return router.createUrlTree(['/login']);
    }),
  );
};
