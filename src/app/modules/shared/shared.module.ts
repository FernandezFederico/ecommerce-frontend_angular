import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';

import { CarouselComponent } from './components/carousel/carousel.component';
import { CardsComponent } from './components/cards/cards.component';
import { ValidationErrorsPipe } from './pipes/validation-errors.pipe';

import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';



@NgModule({
  declarations: [
    CarouselComponent,
    CardsComponent,
    ValidationErrorsPipe,
  ],
  imports: [
    CommonModule,
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


  ]
})
export class SharedModule { }
