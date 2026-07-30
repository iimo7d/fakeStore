import { Component, inject, signal } from '@angular/core';
import { Button } from '../../shared/components/button';
import { RouterLink } from '@angular/router';
import { form, FormField, minLength, required } from '@angular/forms/signals';
import { FormsModule } from '@angular/forms';
import { FormErrors } from '../../shared/components/form-errors';
import { Store } from '@ngrx/store';
import { authAction } from '../../shared/store/auth-action';
import { authFeature } from '../../shared/store/auth-feature';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { HotToastService } from '@ngxpert/hot-toast';
import { Actions, ofType } from '@ngrx/effects';

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
  private readonly toast = inject(HotToastService);
  private readonly actions$ = inject(Actions);

  constructor() {
    this.actions$
      .pipe(ofType(authAction.loginSuccess), takeUntilDestroyed())
      .subscribe(() => this.toast.success('Welcome back! You are now signed in.'));

    this.actions$
      .pipe(ofType(authAction.loginFailure), takeUntilDestroyed())
      .subscribe(({ error }) => {
        this.toast.error(error || 'Unable to sign in. Please try again.');
      });
  }

  protected readonly isLoading = toSignal(this.store.select(authFeature.selectIsLoading), {
    initialValue: false,
  });
  loginModel = signal({
    username: 'johnd',
    password: 'm38rmF$',
  });

  submitted = signal(false);

  loginForm = form(this.loginModel, (rootpath) => {
    required(rootpath.username, { message: 'Username is required' });
    required(rootpath.password, { message: 'Password is required' });
    minLength(rootpath.password, 6, { message: 'Password must be at least 6 charcter long' });
  });

  onSubmit(event: Event) {
    event.preventDefault();

    if (this.isLoading()) {
      this.toast.info('Your sign-in request is already being processed.');
      return;
    }

    this.submitted.set(true);
    if (this.loginForm().valid()) {
      this.store.dispatch(authAction.login(this.loginForm().value()));
    } else {
      this.toast.error('Please fix the errors in the form before submitting.');
    }
  }
}
