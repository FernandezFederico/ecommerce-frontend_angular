import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../../../core/services/products.service';
import { Product } from '../products/interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  selectedProductsList!: Product[];

  ngOnInit(): void {
    this.loadSelectedProducts()
  }

  constructor (
    private productService: ProductsService
  ) { }

  loadSelectedProducts() {
    this.productService.getSelectedProducts().subscribe({
      next: (products) => {
        this.selectedProductsList = products.slice(0, 4)
      }
    })
  }
}
