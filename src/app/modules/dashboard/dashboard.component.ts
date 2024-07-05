import { Component } from '@angular/core';

import { LayoutService } from '../../core/services/layout.service';
import { AuthService } from '../../core/services/auth.service';
import { ResetPassService } from '../../core/services/reset-pass.service';
import { AlertService } from '../../core/services/alert.service';
import { CartService } from '../../core/services/cart.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  showSignUpForm = false;
  constructor(
    public layoutService: LayoutService,
    public authService: AuthService,
    public resetPassService: ResetPassService,
    private alertService: AlertService,
    private cartService: CartService,
  ) {
    this.onGetLoggedInUser();
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
}
