import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ProductsService } from '../../../../../core/services/products.service';
import { ProductsCategory } from '../interface';
@Component({
  selector: 'app-products-dialog',
  templateUrl: './products-dialog.component.html',
  styleUrl: './products-dialog.component.scss',
})
export class ProductsDialogComponent implements OnInit {
  productForm: FormGroup;
  categoryForm: FormGroup;
  categories: ProductsCategory[] = [];
  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<ProductsDialogComponent>,
    private productsService: ProductsService
  ) {
    this.productForm = this.fb.group({
      productImage: this.fb.control('', [Validators.required]),
      productName: this.fb.control('', [
        Validators.required,
        Validators.minLength(3),
      ]),
      productCategory: this.fb.control('', [
        Validators.required,
        Validators.minLength(3),
      ]),
      productPrice: this.fb.control('', [
        Validators.required,
        Validators.pattern('[0-9]*'),
      ]),
      productCreatedAt: this.fb.control('', [Validators.required]),
      productStock: this.fb.control('', [
        Validators.required,
        Validators.pattern('[0-9]*'),
      ]),
      productDescription: this.fb.control('', [
        Validators.required,
        Validators.minLength(3),
      ]),
    });

    this.categoryForm = this.fb.group({
      productCategory: this.fb.control('', [Validators.minLength(3)]),
    });
  }

  ngOnInit(): void {
    this.loadCategories();
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
          alert('Categoría creada');
          this.categoryForm.reset();
          this.loadCategories();
        },
        error: (err) => {
          alert('Error al crear la categoría');
        },
      });
    }
  }

  onDeleteCategory(data: string): void {
    
    this.productsService.deleteCategory(data).subscribe({
      next: () => {
        alert('Categoría eliminada');
        this.loadCategories();
      },
      error: (err) => {
        alert('Error al eliminar la categoría');
      },
    });
  }

  addNewProduct(): void {
    if (this.productForm.valid) {
      this.dialogRef.close(this.productForm.value);
    } else {
      this.productForm.markAllAsTouched();
    }
  }
}
