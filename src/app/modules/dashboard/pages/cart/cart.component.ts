import { Component } from '@angular/core';
import { CartService } from '../../../../core/services/cart.service';
import { Product } from '../products/interface';
import { User } from '../users/interface';
import { AlertService } from '../../../../core/services/alert.service';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent {
  userData!: User;
  userId: string = '';
  productData: Product[] = [];
  subTotalPrice: number = 0;
  totalPrice: number = 0;
  discount  : number = 0;
  delivery  : number = 0;

  formatter = new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
  });

  constructor(
    private cartService: CartService,
  private alertService: AlertService,
  ) {
    this.currentCart();
  }
  currentCart() {
    this.userData = JSON.parse(localStorage.getItem('userData')!);
    this.userId = this.userData._id;
    this.cartService.getCartListByUserId(this.userId).subscribe({
      next: (result) => {
        this.productData = result.map((item) => item.Product);
        this.productData.forEach((item) => {
          if (item.quantity) {
            this.subTotalPrice += item.productPrice * item.quantity;
          }
        });
        this.discount = this.subTotalPrice * 0.2;
        this.delivery = this.subTotalPrice * 0.1;
        this.totalPrice = this.subTotalPrice - this.discount + this.delivery;
      },
    });
  }
  onRemoveFromCart(productDataId: string) {{
      if (this.userId && productDataId) {
        this.cartService
          .removeProductFromCart(this.userId, productDataId)
          .subscribe({
            next: (result) => {
              this.currentCart();
            },
            error: (error) => {
              this.alertService.showErrorAlert('Error al cargar los datos!');
            },
          });
      }
    }
  }
  formatPrice(value: number): string {
    return this.formatter.format(value);
  }
}
