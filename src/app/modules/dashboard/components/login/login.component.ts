import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthService } from '../../../../core/services/auth.service';
import { LayoutService } from '../../../../core/services/layout.service';
import { AlertService } from '../../../../core/services/alert.service';
import { Product } from '../../pages/products/interface';
import { Cart } from '../../pages/customer-products-list/pages/product-detail/interface';
import { CartService } from '../../../../core/services/cart.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  loginForm: FormGroup;
  ShowLoginPassword = false;
  loginMail: string = '';
  loginPassword: string = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private layoutService: LayoutService,
    private alertService: AlertService,
    private cartService: CartService
  ) {
    this.loginForm = this.fb.group({
      email: this.fb.control('', [
        Validators.required,
        Validators.email,
        Validators.minLength(6),
      ]),
      password: this.fb.control('', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(12),
      ]),
    });
  }

  onUserLogin() {
    this.loginMail = this.loginForm.value.email;
    this.loginPassword = this.loginForm.value.password;

    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      this.alertService.showErrorAlert('Por favor, verifique los campos');
    } else {
      this.authService.login(this.loginMail, this.loginPassword).subscribe({
        next: (response) => {
          this.loginForm.reset();
          this.layoutService.toggleSidenav();
          this.alertService.showSuccessAlert('Bienvenido');
          this.saveLocalCartInDb();
        },
        error: (error) => {
          this.alertService.showErrorAlert('Error al iniciar sesión');
        },
      });
    }
  }

  saveLocalCartInDb() {
    let data = localStorage.getItem('cartData');
    let loggedUser = localStorage.getItem('userData');
    if (loggedUser) {
      let userId = JSON.parse(loggedUser)._id;
      if (data) {
        let cartDataList: Product[] = JSON.parse(data);
        cartDataList.forEach((product: Product, index: number) => {
          let cartData: Cart = {
            userId: userId,
            Product: product,
          };
          this.cartService.createCartDataInDb(cartData).subscribe({
            next: (result) => {
              if (cartDataList.length === index + 1) {
                localStorage.removeItem('cartData');
                this.cartService.loadCartFromDb(userId);
              }
            },
            error: (error) => {
              this.alertService.showErrorAlert('Error al cargar los datos!');
            },
          });
        });
      } else {
        this.cartService.loadCartFromDb(userId);
      }
    }
  }
  
}
