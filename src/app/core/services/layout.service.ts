import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LayoutService {
  isSidenavOpen = false;

  showCartInfo = false;
  showUserInfo = false;

  constructor() {}

  toggleSidenav() {
    this.isSidenavOpen = !this.isSidenavOpen;
  }

  toggleCartInfo() {
    this.showCartInfo = !this.showCartInfo;
  }

  toggleUserInfo() {
    this.showUserInfo = !this.showUserInfo;
  }

  toggleCart() {
    this.showCartInfo = false;
    this.showUserInfo = false;
    this.toggleCartInfo();
    this.toggleSidenav();
  }
  toggleUser() {
    this.showUserInfo = false;
    this.showCartInfo = false;
    this.toggleUserInfo();
    this.toggleSidenav();
  }
}
