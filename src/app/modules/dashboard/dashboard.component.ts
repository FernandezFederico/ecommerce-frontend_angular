import { Component, OnInit } from '@angular/core';
import { LayoutService } from '../../core/services/layout.service';
import { AuthService } from '../../core/services/auth.service';
import { User } from './pages/users/interface/index';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {

  constructor(
    public layoutService: LayoutService,
    public authService: AuthService,

  ) { }
  ngOnInit(): void {
    this.onGetLoggedInUser();
  }
  onUserLogout(): void {
    this.authService.logout();
    this.layoutService.toggleSidenav();
  }

  onToggleSidenav(): void {
    this.layoutService.toggleSidenav();
  }

  onIsloggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  onGetLoggedInUser() {
    return this.authService.getLoggedInUser();
  };

}
