import { Product } from '../../product/types/product-type';

export type CartItem = {
  product: Product;
  quantity: number;
};
