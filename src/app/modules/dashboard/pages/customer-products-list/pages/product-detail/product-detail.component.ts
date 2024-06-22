import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../../../../../core/services/products.service';
import { Product } from '../../../products/interface';
import { AlertService } from '../../../../../../core/services/alert.service';
import { CartService } from '../../../../../../core/services/cart.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss',
})
export class ProductDetailComponent {
  productId!: string | null;
  productData!: null | Product;
  quantityOfProducts: number = 1;
  showRemoveCartButton: boolean = false;
  constructor(
    private activeRoute: ActivatedRoute,
    private productsService: ProductsService,
    private alertService: AlertService,
    private cartService: CartService
  ) {
    this.getProductData();
  }

  getProductData() {
    this.activeRoute.paramMap.subscribe({
      next: (params) => {
        this.productId = params.get('id');
        if (this.productId) {
          this.onGetProductById(this.productId);
          this.checkProductInCart(this.productId);
        }
      },
    });
  }
  onGetProductById(data: string) {
    this.productsService.getProductById(data).subscribe({
      next: (result) => {
        this.productData = result;
      },
      error: (error) => {
        console.log(error);
        this.alertService.showErrorAlert('Error al cargar el producto');
      },
    });
  }

  checkProductInCart(productId: string) {
    let cartProducts = this.cartService.getCart();
    this.showRemoveCartButton = cartProducts.some(
      (product) => product._id === productId
    );
  }

  onHandleQuantity(value: string) {
    if (this.quantityOfProducts < 10 && value === 'plus') {
      this.quantityOfProducts++;
    } else if (this.quantityOfProducts > 1 && value === 'min') {
      this.quantityOfProducts--;
    }
  }

  onAddToCart() {
    if (!this.productData)
      this.alertService.showErrorAlert('Error al cagar el producto!');
    else {
      this.productData.quantity = this.quantityOfProducts;
      if (!localStorage.getItem('userData')) {
        this.cartService.addToCard(this.productData);
        this.showRemoveCartButton = true;
      } else {
        console.log('user is logged');
      }
    }
  }

  onRemoveFromCart(productDataId: string) {
    if (this.productData) {
      this.cartService.removeFromCart(this.productData);
      this.showRemoveCartButton = false;
    }
  }
}
