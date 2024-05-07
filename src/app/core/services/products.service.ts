import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { catchError, mergeMap, of } from 'rxjs';

import { environment } from '../../../environments/environment.development';
import {
  Product,
  ProductsCategory,
} from '../../modules/dashboard/pages/products/interface/index';
import { AlertService } from './alert.service';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private http: HttpClient, private alertService: AlertService) {}

  getProducts() {
    return this.http.get<Product[]>(`${environment.apiUrl}/products`).pipe(
      catchError((error) => {
        this.alertService.showErrorAlert('Error al cargar los productos');
        return of([]);
      })
    );
  }

  getCategories() {
    return this.http
      .get<ProductsCategory[]>(`${environment.apiUrl}/categories`)
      .pipe(
        catchError((error) => {
          this.alertService.showErrorAlert('Error al cargar las categorías');
          return of([]);
        })
      );
  }

  createProduct(newProduct: Product) {
    return this.http
      .post<Product>(`${environment.apiUrl}/products`, newProduct)
      .pipe(
        mergeMap(() => this.getProducts()),
        catchError((error) => {
          this.alertService.showErrorAlert(
            'Error al crear el producto, inténtalo de nuevo'
          );
          return of([]);
        })
      );
  }

  createCategory(newCategory: ProductsCategory) {
    return this.http
      .post<Product>(`${environment.apiUrl}/categories`, newCategory)
      .pipe(
        mergeMap(() => this.getCategories()),
        catchError((error) => {
          this.alertService.showErrorAlert('Error al crear la categoría');
          return of([]);
        })
      );
  }

  deleteProduct(productId: string) {
    return this.http
      .delete<Product>(`${environment.apiUrl}/products/${productId}`)
      .pipe(
        mergeMap(() => this.getProducts()),
        catchError((error) => {
          this.alertService.showErrorAlert('Error al borrar los productos');
          return of([]);
        })
      );
  }

  deleteCategory(categoryId: string) {
    return this.http
      .delete<Product>(`${environment.apiUrl}/categories/${categoryId}`)
      .pipe(
        mergeMap(() => this.getCategories()),
        catchError((error) => {
          this.alertService.showErrorAlert('Error al borrar las categorías');
          return of([]);
        })
      );
  }

  updateProduct(productId: string | number, updatedProduct: Product) {
    return this.http
      .put<Product>(
        `${environment.apiUrl}/products/${productId}`,
        updatedProduct
      )
      .pipe(
        mergeMap(() => this.getProducts()),
        catchError((error) => {
          this.alertService.showErrorAlert('Error al actualizar el producto');
          return of([]);
        })
      );
  }

  carouselProducts() {
    return this.http
      .get<Product[]>(`${environment.apiUrl}/products?_limit=3`)
      .pipe();
  }
}
