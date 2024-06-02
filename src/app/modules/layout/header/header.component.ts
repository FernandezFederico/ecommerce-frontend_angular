import { Component, OnDestroy, OnInit } from '@angular/core';
import { LayoutService } from '../../../core/services/layout.service';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';
import { ProductsService } from '../../../core/services/products.service';
import { ProductsCategory } from '../../dashboard/pages/products/interface/index';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit, OnDestroy {
  categories: ProductsCategory[] = [];
  private destroy$ = new Subject<void>();

  constructor(
    private layoutService: LayoutService,
    public authService: AuthService,
    public route: Router,
    public productsService: ProductsService
  ) {}

  ngOnInit(): void {
    this.productsService.categories$
    .pipe(takeUntil(this.destroy$))
    .subscribe((categories) => {
      this.categories = categories;
    })
    this.productsService.loadCategories();
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

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
