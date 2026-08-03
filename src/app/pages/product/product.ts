import { Component, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { toSignal } from '@angular/core/rxjs-interop';
import { Store } from '@ngrx/store';

import { ProductCard } from '../../core/components/product-card';
import { productAction } from './store/product-action';
import { productFeature } from './store/product-feature';
import { Product as ProductModel } from './types/product-type';

@Component({
  selector: 'app-product',
  imports: [FormsModule, ProductCard],
  template: `
    <section class="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
      <div class="mb-8 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p class="text-sm font-semibold text-indigo-600">Our collection</p>
          <h1 class="mt-1 text-3xl font-bold tracking-tight text-slate-900">Products</h1>
          <p class="mt-2 text-sm text-slate-500">Discover something made for your everyday.</p>
        </div>

        <div class="relative w-full sm:w-72">
          <label for="product-search" class="sr-only">Search products</label>
          <svg
            class="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            aria-hidden="true"
          >
            <circle cx="11" cy="11" r="7" />
            <path stroke-linecap="round" d="m20 20-4-4" />
          </svg>

          <input
            id="product-search"
            [(ngModel)]="searchQuery"
            (ngModelChange)="onSearch($event)"
            class="h-10 w-full rounded-lg border border-slate-300 bg-white pl-9 pr-3 text-sm text-slate-900 shadow-sm outline-none transition-[border-color,box-shadow] duration-150 placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
            type="search"
            placeholder="Search products..."
          />
        </div>
      </div>

      @if (loading()) {
        <div
          class="flex min-h-72 flex-col items-center justify-center gap-3 text-slate-500"
          role="status"
        >
          <svg
            class="size-6 animate-spin text-indigo-600"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
          >
            <circle
              class="opacity-25"
              cx="12"
              cy="12"
              r="9"
              stroke="currentColor"
              stroke-width="3"
            />
            <path
              class="opacity-90"
              fill="currentColor"
              d="M21 12a9 9 0 0 0-9-9v3a6 6 0 0 1 6 6h3Z"
            />
          </svg>
          <p class="text-sm font-medium">Loading products...</p>
        </div>
      } @else if (products().length === 0) {
        <div
          class="flex min-h-72 flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-white px-6 text-center"
        >
          <span
            class="grid size-11 place-items-center rounded-xl bg-slate-100 text-slate-500"
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
          <h2 class="mt-4 text-base font-semibold text-slate-900">No products available</h2>
          <p class="mt-1 text-sm text-slate-500">Please check back again soon.</p>
        </div>
      } @else {
        <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          @for (product of products(); track product.id) {
            <app-product-card [product]="product" (addToCart)="onAddToCart($event)" />
          }
        </div>
      }
    </section>
  `,
})
export class Product implements OnInit {
  private readonly store = inject(Store);

  protected searchQuery = signal('');

  protected readonly products = toSignal(this.store.select(productFeature.selectFilterProduct), {
    initialValue: [],
  });

  protected readonly loading = toSignal(this.store.select(productFeature.selectLoading), {
    initialValue: false,
  });

  ngOnInit(): void {
    this.store.dispatch(productAction.loadProducts());
  }

  protected onSearch(query: string): void {
    this.store.dispatch(productAction.search({ searchQuery: query }));
  }

  protected onAddToCart(product: ProductModel): void {
    void product;
  }
}
