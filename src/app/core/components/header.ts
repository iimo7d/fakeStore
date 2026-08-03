import { Component, inject, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Store } from '@ngrx/store';

import { Button } from '../../shared/components/button';
import { authAction } from '../../shared/store/auth-action';
import { toSignal } from '@angular/core/rxjs-interop';
import { selectIsLoggedIn } from '../../shared/store/auth-feature';
import { cartFeature } from '../../pages/cart/stores/cart-feature';
import { cartAction } from '../../pages/cart/stores/cart-action';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive, Button],
  template: `
    <header class="sticky top-0 z-50 border-b border-slate-200/80 bg-white/90 backdrop-blur-xl">
      <div class="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <a
          routerLink="/product"
          class="group inline-flex items-center gap-2.5 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
          aria-label="FakeStore home"
        >
          <span
            class="grid size-9 place-items-center rounded-xl bg-indigo-600 text-white shadow-sm transition-transform duration-150 group-active:scale-[0.97]"
            aria-hidden="true"
          >
            <svg
              class="size-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 8h12l1 12H5L6 8Z" />
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 9V6a3 3 0 0 1 6 0v3" />
            </svg>
          </span>
          <span class="text-base font-bold tracking-tight text-slate-900">FakeStore</span>
        </a>

        <nav class="flex items-center gap-1" aria-label="Account navigation">
          @if (isLoggedIn()) {
            <a
              routerLink="/cart"
              routerLinkActive="bg-indigo-50 text-indigo-700"
              appButton
              variant="ghost"
              size="sm"
            >
              <svg
                class="size-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                aria-hidden="true"
              >
                <circle cx="9" cy="20" r="1" />
                <circle cx="19" cy="20" r="1" />
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M3 4h2l2.4 11.2a2 2 0 0 0 2 1.6h7.8a2 2 0 0 0 2-1.6L21 8H6"
                />
              </svg>
              <span class="hidden sm:inline">Cart</span>
              @if (cartItemCount() > 0) {
                <span
                  class="inline-flex min-w-5 items-center justify-center rounded-full bg-indigo-600 px-1.5 py-0.5 text-[10px] font-bold leading-none text-white"
                  [attr.aria-label]="cartItemCount() + ' items in cart'"
                >
                  {{ cartItemCount() > 99 ? '99+' : cartItemCount() }}
                </span>
              }
            </a>

            <a
              routerLink="/profile"
              routerLinkActive="bg-indigo-50 text-indigo-700"
              appButton
              variant="ghost"
              size="sm"
            >
              <svg
                class="size-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                aria-hidden="true"
              >
                <path stroke-linecap="round" stroke-linejoin="round" d="M20 21a8 8 0 0 0-16 0" />
                <circle cx="12" cy="7" r="4" />
              </svg>
              <span class="hidden sm:inline">Profile</span>
            </a>

            <span class="mx-1 h-5 w-px bg-slate-200" aria-hidden="true"></span>

            <button type="button" appButton variant="destructive" size="sm" (click)="logout()">
              <svg
                class="size-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                aria-hidden="true"
              >
                <path stroke-linecap="round" stroke-linejoin="round" d="M10 17l5-5-5-5M15 12H3" />
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"
                />
              </svg>
              <span class="hidden sm:inline">Log out</span>
            </button>
          } @else {
            <a routerLink="/register" appButton variant="ghost" size="sm">Register</a>
            <a routerLink="/login" appButton variant="primary" size="sm">
              <svg
                class="size-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                aria-hidden="true"
              >
                <path stroke-linecap="round" stroke-linejoin="round" d="M14 8l4 4-4 4" />
                <path stroke-linecap="round" d="M18 12H7" />
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M10 4H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h5"
                />
              </svg>
              <span>Log in</span>
            </a>
          }
        </nav>
      </div>
    </header>
  `,
})
export class Header implements OnInit {
  private readonly store = inject(Store);

  protected readonly cartItemCount = toSignal(this.store.select(cartFeature.selectCartCount), {
    initialValue: 0,
  });

  protected readonly isLoggedIn = toSignal(this.store.select(selectIsLoggedIn), {
    initialValue: false,
  });

  ngOnInit(): void {
    this.store.dispatch(cartAction.loadCart());
  }

  protected logout(): void {
    this.store.dispatch(authAction.logout());
  }
}
