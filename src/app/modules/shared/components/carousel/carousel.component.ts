import { Component, ViewChild } from '@angular/core';
import { NgbCarousel } from '@ng-bootstrap/ng-bootstrap';
import { ProductsService } from '../../../../core/services/products.service';
import { Product } from '../../../dashboard/pages/products/interface';
import { AlertService } from '../../../../core/services/alert.service';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.scss',
})
export class CarouselComponent {
  carouselProductsList: Product[] = [];
  paused = false;
  pauseOnHover = true;
  pauseOnFocus = true;
  @ViewChild('carousel', { static: true }) carousel?: NgbCarousel;

  constructor(
    private productsService: ProductsService,
    private alertService: AlertService
  ) {
    this.loadCarousel();
  }
  loadCarousel() {
    this.productsService.carouselProducts().subscribe({
      next: (products) => {
        this.carouselProductsList = products;
      },
      error: (error) => {
        this.alertService.showErrorAlert('No cargan los datos del carousel');
      },
    });
  }
}
