import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerProductsListRoutingModule } from './customer-products-list-routing.module';
import { CustomerProductsListComponent } from './customer-products-list.component';

import { SharedModule } from '../../../shared/shared.module';
import { ProductDetailComponent } from './pages/product-detail/product-detail.component';



@NgModule({
  declarations: [
    CustomerProductsListComponent,
    ProductDetailComponent,
  ],
  imports: [
    CommonModule,
    CustomerProductsListRoutingModule,
    SharedModule
  ]
})
export class CustomerProductsListModule { }
