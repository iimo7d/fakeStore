import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { MyStorage } from '../../../shared/services/storage';
import { map, tap, withLatestFrom } from 'rxjs';
import { Store } from '@ngrx/store';
import { cartFeature } from './cart-feature';
import { cartAction } from './cart-action';

const CART_STORAGE_KEY = 'ngrxstore_cart';
export const loadCartEffect = createEffect(
  (actions$ = inject(Actions), storage = inject(MyStorage)) => {
    return actions$.pipe(
      ofType(cartAction.loadCart),
      map(() => {
        const cartData = storage.getItem(CART_STORAGE_KEY);
        const items = cartData ? JSON.parse(cartData) : [];
        return cartAction.loadCartSuccess({ cartItems: items });
      })
    );
  },
  {
    functional: true,
  }
);

export const addToCartEffect = createEffect(
  (actions$ = inject(Actions)) => {
    return actions$.pipe(
      ofType(cartAction.addToCart),
      map(({ product }) => cartAction .addToCartSuccess({ product }))
    );
  },
  {
    functional: true,
  }
);


export const persistCartEffect = createEffect(
  (actions$ = inject(Actions), storage = inject(MyStorage), store = inject(Store)) => {
    return actions$.pipe(
      ofType(
        cartAction.addToCartSuccess,
        cartAction.removeFromCart,
        cartAction.updateQuantity,
        cartAction.clearCart
      ),
      withLatestFrom(store.select(cartFeature.selectItems)),
      tap(([, items]) => {
        storage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
      })
    );
  },
  {
    functional: true,
    dispatch: false,
  }
);
