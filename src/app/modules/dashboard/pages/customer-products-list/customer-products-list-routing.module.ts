import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerProductsListComponent } from './customer-products-list.component';

const routes: Routes = [
  {
    path: '',
    component: CustomerProductsListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerProductsListRoutingModule { }
