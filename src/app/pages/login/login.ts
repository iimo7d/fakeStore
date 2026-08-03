import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  form,
  FormField,
  minLength,
  required,
} from '@angular/forms/signals';
import { toSignal } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { HotToastService } from '@ngxpert/hot-toast';

import { Button } from '../../shared/components/button';
import { FormErrors } from '../../shared/components/form-errors';
import { authAction } from '../../shared/store/auth-action';
import { authFeature } from '../../shared/store/auth-feature';

@Component({
  selector: 'app-login',
  imports: [
    Button,
    RouterLink,
    FormField,
    FormsModule,
    FormErrors,
  ],
  templateUrl: './login.html',
  host: {
    class:
      'min-h-screen flex items-center justify-center bg-slate-100 p-4',
  },
})
export class Login {
  private readonly store = inject(Store);
  private readonly toast = inject(HotToastService);

  protected readonly submitted = signal(false);

  protected readonly isLoading = toSignal(
    this.store.select(authFeature.selectIsLoading),
    { initialValue: false },
  );

  protected readonly loginModel = signal({
    username: 'johnd',
    password: 'm38rmF$',
  });

  protected readonly loginForm = form(
    this.loginModel,
    (credentials) => {
      required(credentials.username, {
        message: 'Username is required.',
      });

      required(credentials.password, {
        message: 'Password is required.',
      });

      minLength(credentials.password, 6, {
        message: 'Password must be at least 6 characters long.',
      });
    },
  );

  protected onSubmit(event: Event): void {
    event.preventDefault();

    if (this.isLoading()) {
      return;
    }

    this.submitted.set(true);

    if (this.loginForm().invalid()) {
      this.toast.error(
        'Please fix the errors in the form before submitting.',
      );
      return;
    }

    this.store.dispatch(
      authAction.login(this.loginForm().value()),
    );
  }
}
