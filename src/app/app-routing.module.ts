import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './modules/not-found/not-found.component';
import { DashboardComponent } from './modules/dashboard/dashboard.component';


const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    loadChildren: () => import('./modules/dashboard/dashboard.module').then(
      (m) => m.DashboardModule
    ),
  },
  {
    path: '**',
    redirectTo: 'dashboard/home',
  },
  {
    path: '404',
    component: NotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
