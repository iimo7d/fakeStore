import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Button } from '../../shared/components/button';
import { email, form, FormField, minLength, required, validate } from '@angular/forms/signals';
import { FormsModule } from '@angular/forms';
import { FormErrors } from '../../shared/components/form-errors';
import { toSignal } from '@angular/core/rxjs-interop';
import { Store } from '@ngrx/store';
import { authFeature } from '../../shared/store/auth-feature';
import { authAction } from '../../shared/store/auth-action';

@Component({
  imports: [RouterLink, Button, FormsModule, FormField, FormErrors],
  selector: 'app-register',
  templateUrl: 'register.html',
  host: {
    class: 'min-h-screen flex items-center justify-center bg-slate-100 p-4',
  },
})
export class Register {
  private readonly store = inject(Store);
  protected readonly isLoading = toSignal(this.store.select(authFeature.selectIsLoading), {
    initialValue: false,
  });

  registerModel = signal({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  submitted = signal(false);

  registerForm = form(this.registerModel, (r) => {
    required(r.username, { message: 'Username is required ' });
    email(r.email, { message: 'Please enter a valid email address' });
    required(r.email, { message: 'Email is required ' });
    required(r.password, { message: 'Password is required ' });
    required(r.confirmPassword, { message: 'Password is required ' });
    minLength(r.password, 6, { message: 'Password must be at least 6 charcter long' });
    minLength(r.confirmPassword, 6, { message: 'Password must be at least 6 charcter long' });

    validate(r.confirmPassword, ({ value, valueOf }) => {
      const confirmValue = value();
      const originalValue = valueOf(r.password);

      if (confirmValue !== originalValue) {
        return { kind: 'passwordMismatch', message: 'Passwords do not match' };
      }
      return null;
    });
  });

  onSubmit(event: Event) {
    event.preventDefault();

    const id = Date.now();
    const { confirmPassword, ...rest } = this.registerForm().value();
    const registerRequest = { id, ...rest };

    if (this.isLoading()) return;

    this.submitted.set(true);
    if (this.registerForm().valid()) {
      this.store.dispatch(authAction.register(registerRequest));
    } else console.log('form is invalid');
  }
}
