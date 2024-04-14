import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-products-dialog',
  templateUrl: './products-dialog.component.html',
  styleUrl: './products-dialog.component.scss'
})
export class ProductsDialogComponent {
  productForm: FormGroup;
  constructor(
    private fb: FormBuilder,
  ) {
    this.productForm = this.fb.group({
      productsId: this.fb.control('', [Validators.required, Validators.minLength(3)]),
      productsImage: this.fb.control('', [Validators.required, Validators.minLength(3)]),
      productsName: this.fb.control('', [Validators.required, Validators.minLength(3)]),
      productsCategory: this.fb.control('', [Validators.required, Validators.minLength(3)]),
      productsDescription: this.fb.control('', [Validators.required, Validators.minLength(3)]),
      productsPrice: this.fb.control('', [Validators.required, Validators.minLength(3)]),
      productsCreatedAt: this.fb.control('', [Validators.required, Validators.minLength(3)]),
      productsStock: this.fb.control('', [Validators.required, Validators.minLength(3)])
    });
  }





}
