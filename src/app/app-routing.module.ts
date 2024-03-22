import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './modules/not-found/not-found.component';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { HomeComponent } from './modules/dashboard/pages/home/home.component';
import { UsersComponent } from './modules/dashboard/pages/users/users.component';


const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      {
        path: 'home',
        component: HomeComponent,
        
      },
      {
        path: 'users',
        component: UsersComponent,
      },
      {
        path: '**',
        redirectTo: 'home',
      },
    ]
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
