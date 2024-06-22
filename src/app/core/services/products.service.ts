import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, catchError, mergeMap, of } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { Product, ProductsCategory } from '../../modules/dashboard/pages/products/interface/index';
import { AlertService } from './alert.service';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private productQuerySubject = new BehaviorSubject<string>('');
  productQuery$ = this.productQuerySubject.asObservable();
  cartData: string | null = null;
  cartProduct: Product[] = [];
  cartQuantity = new EventEmitter<Product[] | []>();

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
      .post<ProductsCategory>(`${environment.apiUrl}/categories`, newCategory)
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

  deleteCategory(_id: string) {
    return this.http
      .delete<ProductsCategory>(`${environment.apiUrl}/categories/${_id}`)
      .pipe(
        mergeMap(() => this.getCategories()),
        catchError((error) => {
          this.alertService.showErrorAlert('Error al borrar las categorías');
          return of([]);
        })
      );
  }
  getProductById(id: string) {
    return this.http.get<Product>(`${environment.apiUrl}/products/${id}`).pipe(
      catchError((error) => {
        this.alertService.showErrorAlert('Error al cargar el producto');
        return of(null);
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

  getSelectedProducts() {
    return this.http.get<Product[]>(`${environment.apiUrl}/products?_limit=4`);
  }

  searchProducts(query: string) {
    return this.http
      .get<Product[]>(`${environment.apiUrl}/products/?q=${query}`)
      .pipe(
        catchError((error) => {
          this.alertService.showErrorAlert('Error al buscar los productos');
          return of([]);
        })
      );
  }

  getSearchParam(query: string) {
    this.productQuerySubject.next(query);
  }

  clearSearchParam() {
    this.productQuerySubject.next('');
  }

}
