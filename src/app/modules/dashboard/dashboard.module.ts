import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { HomeComponent } from './pages/home/home.component';
import { SharedModule } from '../shared/shared.module';
import { LayoutModule } from '../layout/layout.module';
import { LoginComponent } from '../auth/login/login.component';
import { SignUpComponent } from '../auth/sign-up/sign-up.component';






@NgModule({
  declarations: [
    HomeComponent,
    DashboardComponent,
    LoginComponent,
    SignUpComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule,
    LayoutModule,
  ],
  exports: [
    DashboardComponent,
  ]
})
export class DashboardModule { }
