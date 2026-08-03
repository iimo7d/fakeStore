import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { Button } from '../../shared/components/button';

@Component({
  selector: 'app-footer',
  imports: [RouterLink, Button],
  template: `
    <footer class="border-t border-slate-200/80 bg-white">
      <div
        class="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-8 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8"
      >
        <div class="flex items-center gap-3">
          <span
            class="grid size-9 shrink-0 place-items-center rounded-xl bg-indigo-50 text-indigo-600"
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

          <div>
            <p class="text-sm font-semibold text-slate-900">FakeStore</p>
            <p class="mt-0.5 text-xs text-slate-500">Simple shopping, thoughtfully built.</p>
          </div>
        </div>

        <nav class="flex flex-wrap items-center gap-x-1" aria-label="Footer navigation">
          <a routerLink="/product" appButton variant="link" size="sm">Products</a>
          <span class="text-slate-300" aria-hidden="true">·</span>
          <a routerLink="/cart" appButton variant="link" size="sm">Cart</a>
          <span class="text-slate-300" aria-hidden="true">·</span>
          <a routerLink="/profile" appButton variant="link" size="sm">Profile</a>
        </nav>
      </div>

      <div class="border-t border-slate-100">
        <p class="mx-auto max-w-7xl px-4 py-4 text-xs text-slate-400 sm:px-6 lg:px-8">
          © {{ currentYear }} FakeStore. All rights reserved.
        </p>
      </div>
    </footer>
  `,
})
export class Footer {
  protected readonly currentYear = new Date().getFullYear();
}
