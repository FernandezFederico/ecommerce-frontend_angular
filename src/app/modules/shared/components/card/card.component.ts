import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
})
export class CardsComponent {
  constructor(
    private router: Router,
  ) {}

  @Input() product!: {
    _id: string;
    productName: string;
    productPrice: number;
    productImage: string;
    productDescription: string;
    productCategory: string;
  };

  @Input() showPrice: boolean = true;
  @Input() showAddButton: boolean = true;
}
