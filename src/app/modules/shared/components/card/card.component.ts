import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
})
export class CardsComponent {
  @Input() product!: {
    productName: string;
    productPrice: number;
    productImage: string;
    productDescription: string;
    productCategory: string;
    
  };

  @Input() showPrice: boolean = true;
  @Input() showAddButton: boolean = true;
}
