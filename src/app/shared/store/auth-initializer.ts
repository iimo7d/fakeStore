import { inject } from '@angular/core';
import { Store } from '@ngrx/store';

import { MyStorage } from '../services/storage';
import { extractToken } from '../util/extractToken';
import { authAction } from './auth-action';

export function restoreAuthSession(): void {
  const store = inject(Store);
  const storage = inject(MyStorage);
  const token = storage.getItem('ngrx_token');

  if (!token) {
    return;
  }

  const payload = extractToken(token);
  const userId = Number(payload?.sub);

  if (!payload || !Number.isInteger(userId) || userId <= 0) {
    storage.removeItem('ngrx_token');
    return;
  }

  store.dispatch(authAction.restoreSession({ token, userId }));
}
