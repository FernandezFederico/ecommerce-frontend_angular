import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductsService } from '../../../../core/services/products.service';
import { Product } from '../products/interface';
import { Subject, takeUntil, switchMap } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-customer-products-list',
  templateUrl: './customer-products-list.component.html',
  styleUrls: ['./customer-products-list.component.scss'],
})
export class CustomerProductsListComponent implements OnInit, OnDestroy {
  productsList: Product[] = [];
  private destroy$ = new Subject<void>();

  constructor(
    private productsService: ProductsService,
    private activeRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.productsService.productQuery$
    .subscribe((query) => {
      this.loadProducts(query);
    });

  }

  loadProducts(query: string) {
    if (query) {
      this.productsService
        .searchProducts(query)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (products) => {
            this.productsList = products;
          },
          error: (err) => console.error(err),
        });
    } else {
      this.productsService
        .getProducts()
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (products) => {
            this.productsList = products;
          },
          error: (err) => console.error(err),
        });
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}