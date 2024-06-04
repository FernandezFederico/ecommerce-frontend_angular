import { Component, OnInit } from '@angular/core';
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
export class HeaderComponent implements OnInit{
  productsList: Product[] = [];
  categories: string[] = [];
  constructor(
    private layoutService: LayoutService,
    public authService: AuthService,
    public route: Router,
    public productsService: ProductsService
  ) {}
  ngOnInit(): void {
    this.loadProducts()
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
  searchCategory(data: string) {
    this.route.navigate([`/dashboard/customer-products-list/search/${data}`]);  
  }

  showAllProducts(): void {
    this.productsService.clearSearchParam();
  }

}
