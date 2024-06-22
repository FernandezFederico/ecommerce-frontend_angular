import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../../../../../core/services/products.service';
import { Product } from '../../../products/interface';
import { AlertService } from '../../../../../../core/services/alert.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss',
})
export class ProductDetailComponent {
  productId!: string | null;
  productData!: null | Product;
  quantity: number = 1;
  cartData = localStorage.getItem('cartData');
  cartProducts: Product[] = [];
  removeCart: boolean = false
  constructor(
    private activeRoute: ActivatedRoute,
    private productsService: ProductsService,
    private alertService: AlertService
  ) {
    this.getProductData();    
  }

  getProductData() {
    this.activeRoute.paramMap.subscribe({
      next: (params) => {
        this.productId = params.get('id');
        if (this.productId) {
          this.onGetProductById(this.productId);
        }
      },
    });
    if(this.productId && this.cartData){
      this.cartProducts = JSON.parse(this.cartData);
      let index = this.cartProducts.filter((product: Product) => this.productId === product._id.toString());
      if(!index.length){
        this.removeCart = false;
    }else{
      this.removeCart = true;
    }
    }
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

  onHandleQuantity(value: string) {
    if (this.quantity < 10 && value === 'plus') {
      this.quantity++;
    } else if (this.quantity > 1 && value === 'min') {
      this.quantity--;
    }
  }

  addToCart(){
    if(!this.productData)
    this.alertService.showErrorAlert('Error al cagar el producto!')
  else{
    this.productData.quantity = this.quantity;
    if(localStorage.getItem('userData')){
      this.productsService.setProductData(this.productData)
      this.removeCart = true;
    }
    
  }
  }

  removeToCart(productDataId: string) {
    this.productsService.removeItemFromCart(productDataId)
    this.removeCart = false;
    
  }

}
