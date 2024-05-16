import { Component } from '@angular/core';
import { ProductsService } from '../../../../core/services/products.service';
import { Product } from '../products/interface';

@Component({
  selector: 'app-customer-products-list',
  templateUrl: './customer-products-list.component.html',
  styleUrl: './customer-products-list.component.scss', 
})
export class CustomerProductsListComponent {
  productsList: Product[] = [];
  
  constructor(
    private productsService: ProductsService,
  ) { 
    this.loadProducts();   
    
  }

  loadProducts() {
    this.productsService.getProducts().subscribe({
      next : (products) => {
        this.productsList = products;      
        console.log(this.productsList);
        
      },
    })
  }

}
