import { Component, OnInit } from '@angular/core';
import { CartService } from '../../../../core/services/cart.service';
import { Product } from '../products/interface';
import { AlertService } from '../../../../core/services/alert.service';
import { AuthService } from '../../../../core/services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent {
  userId: string = '';
  productData: Product[] = [];
  subTotalPrice: number = 0;
  totalPrice: number = 0;
  discount: number = 0;
  delivery: number = 0;

  constructor(
    private cartService: CartService,
    private alertService: AlertService,
    private authService: AuthService,
    private router: Router,
  ) {
    this.cartService.cart$.subscribe({
      next: (cart) => {
        this.productData = cart;
        this.calculateTotals();
        if (this.productData.length === 0 && this.router.url === '/dashboard/cart') {
          this.router.navigate(['/dashboard/home']);
        }
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  calculateTotals() {
    this.subTotalPrice = 0;
    this.productData.forEach((item) => {
      if (item.quantity) {
        this.subTotalPrice += item.productPrice * item.quantity;
      }
    });
    this.discount = parseFloat((this.subTotalPrice * 0.2).toFixed(2));
    this.delivery = parseFloat((this.subTotalPrice * 0.1).toFixed(2));
    this.totalPrice = parseFloat((this.subTotalPrice - this.discount + this.delivery).toFixed(2)
    );
  }

  onRemoveFromCart(productDataId: string) {
    this.userId = this.authService.authLoginUser!._id;
    if (this.userId && productDataId) {
      this.cartService
        .removeProductFromCart(this.userId, productDataId)
        .subscribe({
          next: (result) => {
            this.cartService.getCartProductsFromDb(this.userId);
          },
          error: (error) => {
            this.alertService.showErrorAlert('Error al cargar los datos!');
          },
        });
    }
  }

  onFormatPrice(value: number): string {
    return this.cartService.formatPrice(value);
  }
}
