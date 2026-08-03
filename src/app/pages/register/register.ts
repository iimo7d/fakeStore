import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  email,
  form,
  FormField,
  minLength,
  required,
  validate,
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
  selector: 'app-register',
  imports: [
    RouterLink,
    Button,
    FormsModule,
    FormField,
    FormErrors,
  ],
  templateUrl: './register.html',
  host: {
    class:
      'min-h-screen flex items-center justify-center bg-slate-100 p-4',
  },
})
export class Register {
  private readonly store = inject(Store);
  private readonly toast = inject(HotToastService);

  protected readonly submitted = signal(false);

  protected readonly isLoading = toSignal(
    this.store.select(authFeature.selectIsLoading),
    { initialValue: false },
  );

  protected readonly registerModel = signal({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  protected readonly registerForm = form(
    this.registerModel,
    (credentials) => {
      required(credentials.username, {
        message: 'Username is required.',
      });

      required(credentials.email, {
        message: 'Email is required.',
      });

      email(credentials.email, {
        message: 'Please enter a valid email address.',
      });

      required(credentials.password, {
        message: 'Password is required.',
      });

      minLength(credentials.password, 6, {
        message: 'Password must be at least 6 characters long.',
      });

      required(credentials.confirmPassword, {
        message: 'Please confirm your password.',
      });

      validate(
        credentials.confirmPassword,
        ({ value, valueOf }) => {
          const password = valueOf(credentials.password);
          const confirmPassword = value();

          if (confirmPassword !== password) {
            return {
              kind: 'passwordMismatch',
              message: 'Passwords do not match.',
            };
          }

          return null;
        },
      );
    },
  );

  protected onSubmit(event: Event): void {
    event.preventDefault();

    if (this.isLoading()) {
      return;
    }

    this.submitted.set(true);

    if (this.registerForm().invalid()) {
      this.toast.error(
        'Please fix the errors in the form before submitting.',
      );
      return;
    }

    const { confirmPassword, ...credentials } =
      this.registerForm().value();

    this.store.dispatch(
      authAction.register({
        id: Date.now(),
        ...credentials,
      }),
    );
  }
}
