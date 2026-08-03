import { Product } from './../types/product-type';
import { createFeature, createReducer, on } from '@ngrx/store';
import { productAction } from './product-action';

export type ProductState = {
  products: Product[];
  filterProduct: Product[];
  searchQuery: string | null;
  error: string | null;
  loading: boolean;
};

export const initialProductState: ProductState = {
  products: [],
  filterProduct: [],
  error: null,
  loading: false,
  searchQuery: null,
};

export const productFeature = createFeature({
  name: 'products',
  reducer: createReducer(
    initialProductState,

    on(productAction.loadProducts, (state) => ({
      ...state,
      loading: true,
      error: null,
    })),

    on(productAction.loadProductsSuccess, (state, { products }) => ({
      ...state,
      products,
      filterProduct: products,
      loading: false,
      error: null,
    })),

    on(productAction.loadProductsError, (state, { error }) => ({
      ...state,
      loading: false,
      error: error,
    })),

    on(productAction.search, (state, { searchQuery }) => {
      const filterProduct = state.products.filter((product) =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase()),
      );

      return {
        ...state,
        searchQuery,
        filterProduct,
      };
    }),
  ),
});
