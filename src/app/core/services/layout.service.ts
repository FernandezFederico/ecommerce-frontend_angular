import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LayoutService {
  isSidenavOpen = false;

  showCartInfo = false;
  showUserInfo = false;

  constructor() { }

  toggleSidenav() {
    this.isSidenavOpen = !this.isSidenavOpen;
  }
  toggleCart() {
    this.showCartInfo = false;
    this.showCartInfo = !this.showCartInfo;
    this.showUserInfo = false;
    this.toggleSidenav();
  }
  toggleUser() {
    this.showUserInfo = false;
    this.showUserInfo = !this.showUserInfo;
    this.showCartInfo = false;
    this.toggleSidenav();
  }
}
