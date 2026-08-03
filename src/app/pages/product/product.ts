import { Component, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { toSignal } from '@angular/core/rxjs-interop';
import { Store } from '@ngrx/store';

import { ProductCard } from '../../core/components/product-card';
import { productAction } from './store/product-action';
import { productFeature } from './store/product-feature';
import { Product as ProductModel } from './types/product-type';
import { cartAction } from '../cart/stores/cart-action';

@Component({
  selector: 'app-product',
  imports: [FormsModule, ProductCard],
  templateUrl: './product.html',
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
    this.store.dispatch(cartAction.addToCart({ product }));
  }
}
