import { Component, inject, signal } from '@angular/core';
import { Button } from '../../shared/components/button';
import { RouterLink } from '@angular/router';
import { form, FormField, minLength, required } from '@angular/forms/signals';
import { FormsModule } from '@angular/forms';
import { FormErrors } from '../../shared/components/form-errors';
import { Store } from '@ngrx/store';
import { authAction } from '../../shared/store/auth-action';
import { authFeature } from '../../shared/store/auth-feature';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  imports: [Button, RouterLink, FormField, FormsModule, FormErrors],
  selector: 'app-login',
  templateUrl: 'login.html',
  host: {
    class: 'min-h-screen flex items-center justify-center bg-slate-100 p-4',
  },
})
export class Login {
  private readonly store = inject(Store);
  protected readonly isLoading = toSignal(this.store.select(authFeature.selectIsLoading), {
    initialValue: false,
  });
  loginModel = signal({
    username: '',
    password: '',
  });

  submitted = signal(false);

  loginForm = form(this.loginModel, (rootpath) => {
    required(rootpath.username, { message: 'Username is required' });
    required(rootpath.password, { message: 'Password is required' });
    minLength(rootpath.password, 6, { message: 'Password must be at least 6 charcter long' });
  });

  onSubmit(event: Event) {
    event.preventDefault();

    if (this.isLoading()) return;

    this.submitted.set(true);
    if (this.loginForm().valid()) {
      this.store.dispatch(authAction.login(this.loginForm().value()));
    } else console.log('form is invalid');
  }
}
