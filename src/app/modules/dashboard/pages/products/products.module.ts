import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductsComponent } from './products.component';
import { SharedModule } from '../../../shared/shared.module';
import { ProductsDialogComponent } from './products-dialog/products-dialog.component';



@NgModule({
  declarations: [
    ProductsComponent,
    ProductsDialogComponent
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    SharedModule,
  ]
})
export class ProductsModule { }
