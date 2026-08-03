import { createFeature, createReducer, createSelector, on } from '@ngrx/store';
import { CartItem } from '../types/cart-type';
import { cartAction } from './cart-action';

export type CartState = {
  items: CartItem[];
  loading: boolean;
  error: string | null;
};

export const initialCartState: CartState = {
  items: [],
  loading: false,
  error: null,
};

export const cartFeature = createFeature({
  name: 'cart',
  reducer: createReducer(
    initialCartState,
    on(cartAction.loadCart, (state) => ({
      ...state,
      loading: true,
      error: null,
    })),

    on(cartAction.loadCartSuccess, (state, { cartItems }) => ({
      ...state,
      items: cartItems,
      loading: false,
      error: null,
    })),

    on(cartAction.loadCartFailure, (state, { error }) => ({
      ...state,
      loading: false,
      error: error,
    })),

    on(cartAction.addToCartSuccess, (state, { product }) => {
      const existingItem = state.items.find((item) => item.product.id === product.id);

      if (existingItem) {
        return {
          ...state,
          items: state.items.map((item) =>
            item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item,
          ),
        };
      }
      return {
        ...state,
        items: [...state.items, { product, quantity: 1 }],
      };
    }),

    on(cartAction.removeFromCart, (state, { productId }) => ({
      ...state,
      items: state.items.filter((item) => item.product.id !== productId),
    })),

    on(cartAction.updateQuantity, (state, { productId, quantity }) => ({
      ...state,
      items:
        quantity > 0
          ? state.items.map((item) =>
              item.product.id === productId ? { ...item, quantity } : item,
            )
          : state.items.filter((item) => item.product.id !== productId),
    })),

    on(cartAction.clearCart, (state) => ({
      ...state,
      items: [],
    })),
  ),

  extraSelectors: ({ selectItems }) => ({
    selectCartCount: createSelector(selectItems, (items) =>
      items.reduce((total, item) => total + item.quantity, 0),
    ),

    selectCartTotal: createSelector(selectItems, (items) =>
      items.reduce((total, item) => total + item.product.price * item.quantity, 0),
    ),
  }),
});
