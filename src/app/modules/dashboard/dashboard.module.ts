import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { SharedModule } from '../shared/shared.module';
import { LayoutModule } from '../layout/layout.module';
import { LoginComponent } from './components/login/login.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';

import { HomeModule } from './pages/home/home.module';
import { UsersModule } from './pages/users/users.module';
import { ResetPassComponent } from './components/reset-pass/reset-pass/reset-pass.component';

@NgModule({
  declarations: [
    DashboardComponent,
    LoginComponent,
    SignUpComponent,
    ResetPassComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule,
    LayoutModule,
    HomeModule,
    UsersModule,
  ],
  exports: [DashboardComponent],
})
export class DashboardModule {}
