import { Product } from '../../../../products/interface/index';
export interface Cart {
  _id?: string;
  Product: Product;
  userId: string | undefined;
}
