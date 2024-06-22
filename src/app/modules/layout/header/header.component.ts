import { Component } from '@angular/core';
import { LayoutService } from '../../../core/services/layout.service';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';
import { ProductsService } from '../../../core/services/products.service';
import { Product } from '../../dashboard/pages/products/interface';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  productsList: Product[] = [];
  categories: string[] = [];
  cartItems = 0;
  cartQuantity: string | number | null = null;
  constructor(
    private layoutService: LayoutService,
    public authService: AuthService,
    public route: Router,
    public productsService: ProductsService
  ) {
    this.loadProducts();
    this.cartQuantity = localStorage.getItem('cartData');
    if(this.cartQuantity){
      this.cartItems = JSON.parse(this.cartQuantity).length;
    }
    this.productsService.cartQuantity.subscribe({
      next: (data: Product[]) => {
        this.cartItems = data.length;
      },
    })

}

  loadProducts() {
    this.productsService.getProducts().subscribe({
      next: (products) => {
        this.productsList = products;
        this.extractCategories(products);

      },
    });
  }

  extractCategories(products: Product[]) : void {
    const categorySet = new Set<string>();
    products.forEach(product => {
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