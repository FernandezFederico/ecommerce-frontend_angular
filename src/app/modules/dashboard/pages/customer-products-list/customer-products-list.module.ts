import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerProductsListRoutingModule } from './customer-products-list-routing.module';
import { CustomerProductsListComponent } from './customer-products-list.component';

import { SharedModule } from '../../../shared/shared.module';
import { ProductSearchComponent } from './pages/product-search/product-search.component';


@NgModule({
  declarations: [
    CustomerProductsListComponent,
    ProductSearchComponent,
  ],
  imports: [
    CommonModule,
    CustomerProductsListRoutingModule,
    SharedModule
  ]
})
export class CustomerProductsListModule { }
