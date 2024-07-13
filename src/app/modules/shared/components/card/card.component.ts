import { Component, EventEmitter, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
})
export class CardsComponent {

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
  @Input() addButtonAction: EventEmitter<void> = new EventEmitter();
  @Input() redirectRoute: string = '';

  constructor(private router: Router) {}

  onAddButtonAction() {
    this.addButtonAction.emit();
  }
  onNavigateTo() {
    if (this.redirectRoute) {
      this.router.navigate([this.redirectRoute]);
    }
  }
}
