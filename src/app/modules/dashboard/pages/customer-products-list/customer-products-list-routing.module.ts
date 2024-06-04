import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerProductsListComponent } from './customer-products-list.component';
import { ProductSearchComponent } from './pages/product-search/product-search.component';

const routes: Routes = [
  {
    path: '',
    component: CustomerProductsListComponent
  },
  {
    path: 'search/:query',
    component: ProductSearchComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerProductsListRoutingModule { }
