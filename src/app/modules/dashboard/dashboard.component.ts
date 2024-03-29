import { Component } from '@angular/core';
import { LayoutService } from '../../core/services/layout.service';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {

  constructor(
    public layoutService: LayoutService,
    private authService: AuthService,

    ) { }

    onLogout(): void {
      this.authService.logout();
      this.layoutService.toggleSidenav();
    }

}
