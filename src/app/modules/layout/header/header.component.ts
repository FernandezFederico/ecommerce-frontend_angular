import { Component } from '@angular/core';
import { LayoutService } from '../../../core/services/layout.service';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';
import { ProductsService } from '../../../core/services/products.service';
import { Product } from '../../dashboard/pages/products/interface';
import { CartService } from '../../../core/services/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  productsList: Product[] = [];
  categories: string[] = [];
  cartItems = 0;
  constructor(
    private layoutService: LayoutService,
    public authService: AuthService,
    public route: Router,
    public productsService: ProductsService,
    private cartService: CartService
  ) {
    this.loadProducts();
    this.cartItems = this.cartService.getCartItemCount();
    this.cartService.cart$.subscribe((cart) => {
      this.cartItems = cart.length;
    });
    let loggedUser = localStorage.getItem('userData');
    if (loggedUser) {
      let userId = JSON.parse(loggedUser)._id;
      this.cartService.getCartProductsFromDb(userId);
    }
  }

  loadProducts() {
    this.productsService.getProducts().subscribe({
      next: (products) => {
        this.productsList = products;
        this.extractCategories(products);
      },
    });
  }

  extractCategories(products: Product[]): void {
    const categorySet = new Set<string>();
    products.forEach((product) => {
      if (product.productCategory) {
        categorySet.add(product.productCategory);
      }
    });

    this.categories = Array.from(categorySet);
  }

  onToggleCartSidenav() {
    this.layoutService.toggleCart();
  }

  onToggleUserSidenav() {
    this.layoutService.toggleUser();
  }

  onIsLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  onGetSearchParam(event: KeyboardEvent) {
    const target = event.target as HTMLInputElement;
    this.productsService.getSearchParam(target.value);
  }
  productsByCategory(data: string) {
    this.productsService.getSearchParam(data);
  }

  showAllProducts(): void {
    this.productsService.clearSearchParam();
  }
}
