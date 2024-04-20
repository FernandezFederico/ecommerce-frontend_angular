import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { catchError, mergeMap, of } from 'rxjs';

import { environment } from '../../../environments/environment.development';
import { Product } from '../../modules/dashboard/pages/products/interface/index';

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

  createProduct(newProduct: Product) {
    return this.http
      .post<Product>(`${environment.apiUrl}/products`, newProduct)
      .pipe(mergeMap(() => this.getProducts()));
  }

  deleProduct(productId: string) {
    return this.http
      .delete<Product>(`${environment.apiUrl}/products/${productId}`)
      .pipe(mergeMap(() => this.getProducts()));
  }


}
