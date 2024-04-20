export interface Product {
  id: string;
  productImage: string;
  productName: string;
  productCategory: string;
  productPrice: number;
  productCreatedAt: Date | string;
  productStock: number;
  productDescription: string;
}
