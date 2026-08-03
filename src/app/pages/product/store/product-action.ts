import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Product } from '../types/product-type';

export const productAction = createActionGroup({
  source: 'product',
  events: {
    loadProducts: emptyProps(),
    loadProductsSuccess: props<{ products: Product[] }>(),
    loadProductsError: props<{ error: string }>(),

    search: props<{searchQuery: string}>(),
  },
});
