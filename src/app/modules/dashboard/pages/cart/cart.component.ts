import { Component } from '@angular/core';
import { CartService } from '../../../../core/services/cart.service';
import { Product } from '../products/interface';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent {
  productData: Product[] = [];
  subTotalPrice: number = 0;
  totalPrice: number = 0;
  discount  : number = 0;
  delivery  : number = 0;

  constructor(private CartService: CartService) {
    this.currentCart();
  }
  currentCart() {
    let userData = localStorage.getItem('userData');
    let userId = JSON.parse(userData!)._id;
    this.CartService.getCartListByUserId(userId).subscribe({
      next: (result) => {
        console.log(result);
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
}
