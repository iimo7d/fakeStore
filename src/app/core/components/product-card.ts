import { CurrencyPipe, DecimalPipe, TitleCasePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';

import { Product } from '../../pages/product/types/product-type';
import { Button } from '../../shared/components/button';

@Component({
  selector: 'app-product-card',
  imports: [Button, CurrencyPipe, DecimalPipe, TitleCasePipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'block h-full',
  },
  template: `
    @if (product(); as item) {
      <article
        class="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm transition-[transform,box-shadow,border-color] duration-200 hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-lg motion-reduce:transform-none"
      >
        <div
          class="relative flex aspect-4/3 items-center justify-center overflow-hidden bg-slate-50 p-6"
        >
          <img
            class="h-full w-full object-contain transition-transform duration-200 group-hover:scale-[1.03] motion-reduce:transform-none"
            [src]="item.image"
            [alt]="item.title"
            loading="lazy"
          />

          <span
            class="absolute left-3 top-3 max-w-[calc(100%-1.5rem)] truncate rounded-full border border-slate-200/80 bg-white/90 px-2.5 py-1 text-[11px] font-semibold text-slate-600 shadow-sm backdrop-blur-sm"
          >
            {{ item.category | titlecase }}
          </span>
        </div>

        <div class="flex flex-1 flex-col p-5">
          <div class="flex items-center gap-1.5 text-xs">
            <span class="inline-flex items-center gap-1 font-semibold text-slate-700">
              <svg
                class="size-4 fill-amber-400 text-amber-400"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  d="m12 2.75 2.78 5.63 6.22.9-4.5 4.39 1.06 6.2L12 16.94l-5.56 2.93 1.06-6.2L3 9.28l6.22-.9L12 2.75Z"
                />
              </svg>
              {{ item.rating.rate | number: '1.1-1' }}
            </span>
            <span class="text-slate-300" aria-hidden="true">·</span>
            <span class="text-slate-500">{{ item.rating.count }} reviews</span>
          </div>

          <h2 class="mt-3 line-clamp-2 text-base font-semibold leading-6 text-slate-900">
            {{ item.title }}
          </h2>

          <p class="mt-2 line-clamp-2 text-sm leading-5 text-slate-500">
            {{ item.description }}
          </p>

          <div class="mt-auto flex items-center justify-between gap-4 pt-5">
            <p class="text-xl font-bold tracking-tight text-slate-900">
              {{ item.price | currency: 'USD' }}
            </p>

            @if (isAuthed()) {
              <button
                type="button"
                appButton
                variant="primary"
                size="sm"
                [attr.aria-label]="'Add ' + item.title + ' to cart'"
                (click)="addToCart.emit(item)"
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
                  <path stroke-linecap="round" d="M12 10v4M10 12h4" />
                </svg>
                Add to cart
              </button>
            }
          </div>
        </div>
      </article>
    }
  `,
})
export class ProductCard {
  readonly product = input.required<Product>();
  readonly addToCart = output<Product>();
  readonly isAuthed = input<boolean>(false);
}
