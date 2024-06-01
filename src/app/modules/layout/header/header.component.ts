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
  constructor(
    private layoutService: LayoutService,
    public authService: AuthService,
    public route: Router,
    public productsService: ProductsService
  ) {}

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
}
