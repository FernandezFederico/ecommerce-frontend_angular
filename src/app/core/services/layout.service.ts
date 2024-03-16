import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LayoutService {

  showCartInfo = false;
  showUserInfo = false;
  isSidenavOpen = false;

  constructor() { }

  toggleSidenav() {
    this.isSidenavOpen = !this.isSidenavOpen;
  }
  toggleCart() {
    this.showCartInfo = !this.showCartInfo;
    this.showUserInfo = false;
    this.toggleSidenav();
  }
  toggleUser() {
    this.showUserInfo = !this.showUserInfo;
    this.showCartInfo = false;
    this.toggleSidenav();
  }
}
