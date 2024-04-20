import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-products-dialog',
  templateUrl: './products-dialog.component.html',
  styleUrl: './products-dialog.component.scss'
})
export class ProductsDialogComponent {
  productForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<ProductsDialogComponent>,
  ) {
    this.productForm = this.fb.group({
      productImage: this.fb.control('', [Validators.required]),
      productName: this.fb.control('', [Validators.required, Validators.minLength(3)]),
      productCategory: this.fb.control('', [Validators.required, Validators.minLength(3)]),
      productPrice: this.fb.control('', [Validators.required, Validators.pattern('[0-9]*')]),
      productCreatedAt: this.fb.control('', [Validators.required]),
      productStock: this.fb.control('', [Validators.required, Validators.pattern('[0-9]*')]),
      productDescription: this.fb.control('', [Validators.required, Validators.minLength(3)]),
    });
  }

  addNewProduct(): void {
    if (this.productForm.valid) {
      this.dialogRef.close(this.productForm.value);
    }else{
      this.productForm.markAllAsTouched();
    }
    
  }


}
