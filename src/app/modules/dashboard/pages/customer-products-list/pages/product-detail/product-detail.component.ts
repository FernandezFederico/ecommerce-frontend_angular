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
  constructor(
    private activeRoute: ActivatedRoute,
    private productsService: ProductsService,
    private alertService: AlertService,
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
      }
    });
  }
  onGetProductById(data: string) {
    this.productsService.getProductById(data).subscribe({
      next: (result) => {
        this.productData = result;
        console.log(this.productData);
      },
      error: (error) => {
        console.log(error);
        this.alertService.showErrorAlert('Error al cargar el producto');
      }
    });
  }

  onDecrementQuantity(value: string){
    if ( this.quantity < 10 && value === 'plus') {
      this.quantity++;
    } else if ( this.quantity > 1 && value === 'min') {
      this.quantity--;
    }

  }
}
