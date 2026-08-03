import { CurrencyPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Router, RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { HotToastService } from '@ngxpert/hot-toast';

import { Button } from '../../shared/components/button';
import { cartAction } from './stores/cart-action';
import { cartFeature } from './stores/cart-feature';

@Component({
  selector: 'app-cart',
  imports: [Button, CurrencyPipe, RouterLink],
  templateUrl: './cart.html',
})
export class Cart {
  private readonly store = inject(Store);
  private readonly router = inject(Router);
  private readonly toast = inject(HotToastService);

  protected readonly loading = toSignal(this.store.select(cartFeature.selectLoading), {
    initialValue: false,
  });
  protected readonly items = toSignal(this.store.select(cartFeature.selectItems), {
    initialValue: [],
  });
  protected readonly error = toSignal(this.store.select(cartFeature.selectError), {
    initialValue: null,
  });
  protected readonly cartTotal = toSignal(this.store.select(cartFeature.selectCartTotal), { initialValue: 0 });
  protected readonly cartCount = toSignal(this.store.select(cartFeature.selectCartCount), {
    initialValue: 0,
  });

  protected onRemove(productId: number): void {
    this.store.dispatch(cartAction.removeFromCart({ productId }));
  }

  protected onUpdateQuantity(productId: number, quantity: number): void {
    this.store.dispatch(cartAction.updateQuantity({ productId, quantity }));
  }

  protected onClearCart(): void {
    this.store.dispatch(cartAction.clearCart());
  }

  protected onCheckout(): void {
    if (this.items().length === 0) {
      return;
    }

    this.store.dispatch(cartAction.clearCart());
    void this.router.navigateByUrl('/product').then((navigated) => {
      if (navigated) {
        this.toast.success('Your order has been placed successfully!');
      }
    });
  }
}
