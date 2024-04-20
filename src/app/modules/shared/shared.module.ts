import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatTableModule } from '@angular/material/table'
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';

import { CarouselComponent } from './components/carousel/carousel.component';
import { CardsComponent } from './components/cards/cards.component';
import { ValidationErrorsPipe } from './pipes/validation-errors.pipe';
import { TableComponent } from './components/table/table.component';




@NgModule({
  declarations: [
    CarouselComponent,
    CardsComponent,
    ValidationErrorsPipe,
    TableComponent,
  ],
  imports: [
    CommonModule,
    MatTableModule,
  ],
  exports: [
    ValidationErrorsPipe,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatSidenavModule,
    MatFormFieldModule,
    MatInputModule,
    IconFieldModule,
    InputIconModule,
    CarouselComponent,
    CardsComponent,
    MatCardModule,
    ReactiveFormsModule,
    MatListModule,
    TableComponent,
    MatPaginatorModule,
    MatTableModule,
    MatSortModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule,
    
  ]
})
export class SharedModule { }
