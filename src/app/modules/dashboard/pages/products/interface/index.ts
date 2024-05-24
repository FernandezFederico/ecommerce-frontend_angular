export interface Product {
  _id: string;
  productImage: string;
  productName: string;
  productCategory: string | ProductsCategory;
  productPrice: number;
  createdAt: Date | string;
  productStock: number;
  productDescription: string;
}

export interface ProductsCategory {
  _id: string;
  productCategory: string;
}