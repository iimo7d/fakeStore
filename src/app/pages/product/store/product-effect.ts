import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ProductApi } from '../services/product-api';
import { inject } from '@angular/core';
import { productAction } from './product-action';
import { catchError, map, of, switchMap } from 'rxjs';

export const productEffect = createEffect(
  (action$ = inject(Actions), productApi = inject(ProductApi)) => {
    return action$.pipe(
      ofType(productAction.loadProducts),
      switchMap(() => {
        return productApi.getProducts().pipe(
          map((products) => productAction.loadProductsSuccess({ products })),
          catchError((error) => of(productAction.loadProductsError({ error: error.message }))),
        );
      }),
    );
  },
  { functional: true },
);
