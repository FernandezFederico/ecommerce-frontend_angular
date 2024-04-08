import { Component, inject } from '@angular/core';
import { LayoutService } from '../../../core/services/layout.service';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  constructor(
    private layoutService: LayoutService,
    public authService: AuthService,
    public route: Router,
  ) { }

  onToggleCartSidenav() {
    this.layoutService.toggleCart();
  }

  onToggleUserSidenav() {
    this.layoutService.toggleUser();
  }

  onIsloggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

}
