import { Component } from '@angular/core';

import { LayoutService } from '../../core/services/layout.service';
import { AuthService } from '../../core/services/auth.service';
import { ResetPassService } from '../../core/services/reset-pass.service';
import { AlertService } from '../../core/services/alert.service';
import { CartService } from '../../core/services/cart.service';
import { Product } from './pages/products/interface';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  showSignUpForm = false;
  productData: Product[] = [];
  constructor(
    public layoutService: LayoutService,
    public authService: AuthService,
    public resetPassService: ResetPassService,
    private alertService: AlertService,
    private cartService: CartService,
  ) {
    this.onGetLoggedInUser();
    this.cartService.cart$.subscribe((cart) => {
      this.productData = cart;
    });
  }
  onIsLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }
  onUserLogout(): void {
    this.authService.logout();
    this.layoutService.toggleSidenav();
    this.alertService.showSuccessAlert('Sesión cerrada');
    this.cartService.resetCart();
  }

  onToggleSidenav(): void {
    this.layoutService.toggleSidenav();
  }

  onGetLoggedInUser() {
    return this.authService.getLoggedInUser();
  }

  toggleForms() {
    this.showSignUpForm = !this.showSignUpForm;
  }

  onToggleResetForms() {
    this.resetPassService.toggleResetForms();
  }

  onRemoveFromCart(productDataId: string) {
    let userId = this.authService.authLoginUser!._id;
    if (userId && productDataId) {
    }
    this.cartService.removeProductFromCart(userId, productDataId).subscribe({
      next: (result) => {
        this.cartService.getCartProductsFromDb(userId);
      },
      error: (error) => {
        this.alertService.showErrorAlert('Error al cargar los datos!');
      },
    });
  }
}
