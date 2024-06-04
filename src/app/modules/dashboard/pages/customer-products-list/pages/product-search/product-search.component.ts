import { Component, OnDestroy, OnInit } from '@angular/core';
import { Product } from '../../../products/interface';
import { ProductsService } from '../../../../../../core/services/products.service';
import { ActivatedRoute } from '@angular/router';
import { Subject, switchMap, takeUntil } from 'rxjs';

@Component({
  selector: 'app-product-search',
  templateUrl: './product-search.component.html',
  styleUrl: './product-search.component.scss'
})
export class ProductSearchComponent implements OnInit, OnDestroy {
  productsList: Product[] = [];

  private destroy$ = new Subject<void>();

  constructor(
    private productsService: ProductsService,
    private activatedRoute: ActivatedRoute
  ) { }
  
  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(
        takeUntil(this.destroy$),
        switchMap(params => {
          const query = params['query'];
          return this.productsService.searchProducts(query);
        })
      )
      .subscribe({
        next: (products) => {
          this.productsList = products;
        },
        error: (err) => console.error(err),
      });
  }

  loadProducts() {
    let query = this.activatedRoute.snapshot.paramMap.get('query');
    query && this.productsService.searchProducts(query).subscribe((result) => {
        this.productsList = result;        
      });
  }

  ngOnDestroy(): void {
    throw new Error('Method not implemented.');
  }

}
