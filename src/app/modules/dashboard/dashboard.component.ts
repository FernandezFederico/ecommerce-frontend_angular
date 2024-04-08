import { Component, OnInit } from '@angular/core';

import { LayoutService } from '../../core/services/layout.service';
import { AuthService } from '../../core/services/auth.service';
import { ResetPassService } from '../../core/services/reset-pass.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
  showSignUpForm = false;
  constructor(
    public layoutService: LayoutService,
    public authService: AuthService,
    public resetPassService: ResetPassService,

  ) { }


  ngOnInit(): void {
    this.onGetLoggedInUser();
    
  }
  onIsloggedIn(): boolean {
    return this.authService.isLoggedIn();
  }
  onUserLogout(): void {
    this.authService.logout();
    this.layoutService.toggleSidenav();
  }

  onToggleSidenav(): void {
    this.layoutService.toggleSidenav();
  }

  onGetLoggedInUser() {
    return this.authService.getLoggedInUser();
  }

  toggleForms() {
    this.showSignUpForm = !this.showSignUpForm
  }

  onToggleResetForms() {
    this.resetPassService.toggleResetForms()
  }

}
