import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { CartItem } from '../types/cart-type';
import { Product } from '../../product/types/product-type';

export const cartAction = createActionGroup({
  source: 'Cart',
  events: {
    loadCart: emptyProps(),
    loadCartSuccess: props<{ cartItems: CartItem[] }>(),
    loadCartFailure: props<{ error: string }>(),

    addToCart: props<{ product: Product }>(),
    addToCartSuccess: props<{ product: Product }>(),
    addToCartFailure: props<{ error: string }>(),

    removeFromCart: props<{ productId: number }>(),
    updateQuantity: props<{ productId: number; quantity: number }>(),

    clearCart: emptyProps(),
  },
});
