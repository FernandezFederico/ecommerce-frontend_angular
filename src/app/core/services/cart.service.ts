import { Injectable } from '@angular/core';
import { Product } from '../../modules/dashboard/pages/products/interface';
import { BehaviorSubject, catchError, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Cart } from '../../modules/dashboard/pages/customer-products-list/pages/product-detail/interface/index';
import { environment } from '../../../environments/environment.development';
import { AlertService } from './alert.service';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cart: Product[] = [];
  private cartSubject = new BehaviorSubject<Product[]>(this.cart);
  cart$ = this.cartSubject.asObservable();

  constructor(private http: HttpClient, private alertService: AlertService) {
    this.loadCartFromStorage();
  }
  private loadCartFromStorage() {
    let cartData = localStorage.getItem('cartData');
    if (cartData) {
      this.setCartItems(JSON.parse(cartData));
    }
  }
  setCartItems(cart: Product[]) {
    this.cart = cart;
    this.cartSubject.next(this.cart);
  }
  addToCard(product: Product) {
    this.cart.push(product);
    localStorage.setItem('cartData', JSON.stringify(this.cart));
    this.cartSubject.next(this.cart);
  }

  removeFromLocalCart(product: Product) {
    let index = this.cart.findIndex((item) => item._id === product._id);
    if (index !== -1) {
      this.cart.splice(index, 1);
      localStorage.setItem('cartData', JSON.stringify(this.cart));
      this.cartSubject.next(this.cart);
    }
    if (this.getCartItemCount() <= 0) {
      this.clearCart();
    }
  }
  clearCart() {
    this.cart = [];
    localStorage.removeItem('cartData');
    this.cartSubject.next(this.cart);
  }
  getCart(): Product[] {
    return this.cart;
  }

  resetCart() {
    this.cart = [];
    localStorage.removeItem('cartData');
    this.cartSubject.next(this.cart);
  }
  getCartItemCount(): number {
    return this.cart.length;
  }
  createCartDataInDb(newCart: Cart) {
    return this.http.post<Cart>(`${environment.apiUrl}/carts`, newCart);
  }
  getCartListByUserId(userId: string) {
    return this.http
      .get<Cart[]>(`${environment.apiUrl}/carts/user/${userId}`)
      .pipe(
        catchError((error) => {
          this.alertService.showErrorAlert('Error al cargar los productos');
          return of([]);
        })
      );
  }
  getCartProductsFromDb(userId: string) {
    this.getCartListByUserId(userId).subscribe({
      next: (cartItem: Cart[]) => {
        this.setCartItems(cartItem.map((item) => item.Product));
      },
      error: (error) => {
        this.alertService.showErrorAlert('Error al cargar los datos!');
      },
    });
  }
  removeProductFromCart(userId: string, productId: string) {
    return this.http.delete<Cart>(
      `${environment.apiUrl}/carts/user/${userId}/product/${productId}`
    );
  }
}
