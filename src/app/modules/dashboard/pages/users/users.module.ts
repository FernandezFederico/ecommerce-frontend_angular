import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';
import { SharedModule } from '../../../shared/shared.module';
import { UsersDialogComponent } from './users-dialog/users-dialog.component';


@NgModule({
  declarations: [
    UsersComponent,
    UsersDialogComponent
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    SharedModule,
  ]
})
export class UsersModule { }
