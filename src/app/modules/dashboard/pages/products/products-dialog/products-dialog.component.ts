import { Component, Inject, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProductsService } from '../../../../../core/services/products.service';
import { Product, ProductsCategory } from '../interface';
import { MatSelect } from '@angular/material/select';
import { AlertService } from '../../../../../core/services/alert.service';
import { DomSanitizer } from '@angular/platform-browser';
@Component({
  selector: 'app-products-dialog',
  templateUrl: './products-dialog.component.html',
  styleUrl: './products-dialog.component.scss',
})
export class ProductsDialogComponent {
  @ViewChild('categorySelect') categorySelect: MatSelect | undefined;
  productForm: FormGroup;
  categoryForm: FormGroup;
  categories: ProductsCategory[] = [];
  file: File | null = null;
  previewImage: string | null = null;
  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<ProductsDialogComponent>,
    private productsService: ProductsService,
    private alertService: AlertService,
    private sanitizer: DomSanitizer,
    @Inject(MAT_DIALOG_DATA) public data: Product
  ) {
    
    this.loadCategories();

    this.productForm = this.fb.group({
      productImage: this.fb.control(''),
      productName: this.fb.control('', [Validators.required, Validators.minLength(3),]),
      productCategory: this.fb.control('', [Validators.required, Validators.minLength(3),]),
      productPrice: this.fb.control('', [Validators.required, Validators.pattern('[0-9]*'),]),
      createdAt: this.fb.control('', [Validators.required]),
      productStock: this.fb.control('', [Validators.required, Validators.pattern('[0-9]*'),]),
      productDescription: this.fb.control('', [Validators.required, Validators.minLength(3),]),
    });

    this.categoryForm = this.fb.group({
      productCategory: this.fb.control('', [Validators.minLength(3)]),
    });

    if (data) {
      this.productForm.patchValue(data);
    }
  }

  onSaveProduct(): void {
    if (this.productForm.valid) {
      this.dialogRef.close(this.productForm.value);
    } else {
      this.productForm.markAllAsTouched();
    }
  }

  loadCategories(): void {
    this.productsService.getCategories().subscribe({
      next: (categories) => {
        this.categories = categories;
      },
    });
  }

  onCreateCategory(): void {
    if (this.categoryForm.valid) {
      this.productsService.createCategory(this.categoryForm.value).subscribe({
        next: () => {
          this.alertService.showSuccessAlert('Categoría creada');
          this.categoryForm.reset();
          this.loadCategories();
          this.categorySelect?.close();
        },
        error: (err) => {
          this.alertService.showErrorAlert('Error al crear la categoría');
        },
      });
    }
  }

  onDeleteCategory(data: string): void {
    this.alertService.showDeleteConfirmation().then((confirmed) => {
      if (confirmed) {
        this.productsService.deleteCategory(data).subscribe({
          next: () => {
            this.loadCategories();
          },
          complete: () => {
            this.alertService.showSuccessAlert('Categoría eliminada');
          },
          error: (err) => {
            alert('Error al eliminar la categoría');
          },
        });
      }
    });
  }
}
