import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { catchError, mergeMap, of } from 'rxjs';

import { environment } from '../../../environments/environment.development';
import { Product, ProductsCategory } from '../../modules/dashboard/pages/products/interface/index';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private http: HttpClient) {}

  getProducts() {
    return this.http.get<Product[]>(`${environment.apiUrl}/products`).pipe(
      catchError((error) => {
        alert('Error al cargar los productos');
        return of([]);
      })
    );
  }

  getCategories() {
    return this.http.get<ProductsCategory[]>(`${environment.apiUrl}/categories`).pipe(
      catchError((error) => {
        alert('Error al cargar las categorías');
        return of([]);
      })
    );
  }


  createProduct(newProduct: Product) {
    return this.http
      .post<Product>(`${environment.apiUrl}/products`, newProduct)
      .pipe(mergeMap(() => this.getProducts()));
  }

  createCategory(newCategory: ProductsCategory) {
    console.log(newCategory, 'nueva categoria');
    return this.http
    .post<Product>(`${environment.apiUrl}/categories`, newCategory)
    
  }

  
  deleteProduct(productId: string) {
    return this.http
      .delete<Product>(`${environment.apiUrl}/products/${productId}`)
      .pipe(mergeMap(() => this.getProducts()));
  }

  deleteCategory(categoryId: string) {
    return this.http
      .delete<Product>(`${environment.apiUrl}/categories/${categoryId}`)
      .pipe(mergeMap(() => this.getCategories()));
  }


}
