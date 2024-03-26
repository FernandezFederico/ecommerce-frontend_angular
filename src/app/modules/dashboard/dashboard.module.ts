import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { HomeComponent } from './pages/home/home.component';
import { SharedModule } from '../shared/shared.module';
import { LayoutModule } from '../layout/layout.module';
import { LoginComponent } from '../auth/login/login.component';
import { SignUpComponent } from '../auth/sign-up/sign-up.component';
import { HttpClientModule } from '@angular/common/http';
import { UsersComponent } from './pages/users/users.component';
import { RouterModule } from '@angular/router';







@NgModule({
  declarations: [
    DashboardComponent,
    LoginComponent,
    SignUpComponent,
    HomeComponent,
    UsersComponent,
    
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule,
    LayoutModule,
    HttpClientModule,
    RouterModule.forChild(
      [
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
    )
    
  ],
  exports: [
    DashboardComponent,
  ]
})
export class DashboardModule { }
