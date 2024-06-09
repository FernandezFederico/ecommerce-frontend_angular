import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';

import { CarouselComponent } from './components/carousel/carousel.component';
import { CardsComponent } from './components/card/card.component';
import { ValidationErrorsPipe } from './pipes/validation-errors.pipe';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';




@NgModule({
  declarations: [
    CarouselComponent,
    CardsComponent,
    ValidationErrorsPipe,
    
  ],
  imports: [
    CommonModule,
    MatTableModule,
    MatFormFieldModule,
    NgbCarouselModule,
    MatCardModule,
    MatButtonModule,
    RouterModule,


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
    MatPaginatorModule,
    MatTableModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatProgressSpinnerModule,    
  ]
})
export class SharedModule { }
