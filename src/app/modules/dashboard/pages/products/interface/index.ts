export interface Product {
  _id: string ;
  productImage: string | any;
  productName: string;
  productCategory: string;
  productPrice: number;
  createdAt: Date | string;
  productStock: number;
  productDescription: string;
}

export interface ProductsCategory {
  _id: string;
  productCategory: string;
}