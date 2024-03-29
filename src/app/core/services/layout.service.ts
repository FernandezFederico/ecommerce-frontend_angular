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
    //! paso a false primero 
    //! para que siempre que se presione arranque en false y evito errores 
    //! al mostrar si intercalo entre cart y user
    this.showCartInfo = !this.showCartInfo;
    this.showUserInfo = false;
    this.toggleSidenav();
  }
  toggleUser() {
    this.showUserInfo = false;
    //! paso a false primero 
    //! para que siempre que se presione arranque en false y evito errores 
    //! al mostrar si intercalo entre cart y user
    this.showUserInfo = !this.showUserInfo;
    this.showCartInfo = false;
    this.toggleSidenav();
  }
}
