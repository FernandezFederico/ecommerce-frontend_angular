import { Injectable } from '@angular/core';
import { Product } from '../../modules/dashboard/pages/products/interface';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cart: Product[] = [];
  private cartSubject = new BehaviorSubject<Product[]>(this.cart);
  cart$ = this.cartSubject.asObservable();

  constructor() {
    this.loadCartFromStorage();
  }

  private loadCartFromStorage() {
    let cartData = localStorage.getItem('cartData');
    if (cartData) {
      this.cart = JSON.parse(cartData);
      this.cartSubject.next(this.cart);
    }
  }
  addToCard(product: Product) {
    this.cart.push(product);
    localStorage.setItem('cartData', JSON.stringify(this.cart));
    this.cartSubject.next(this.cart);
  }

  removeFromCart(product: Product) {
    let index = this.cart.findIndex((item) => item._id === product._id);
    if (index !== -1) {
      this.cart.splice(index, 1);
      localStorage.setItem('cartData', JSON.stringify(this.cart));
      this.cartSubject.next(this.cart);
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
  getCartItemCount(): number {
    return this.cart.length;
  }
}
