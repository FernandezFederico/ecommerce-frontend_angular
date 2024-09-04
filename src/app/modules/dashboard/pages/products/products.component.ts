import { Component, ViewChild } from '@angular/core';
import { ProductsService } from '../../../../core/services/products.service';
import { Product } from './interface';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { ProductsDialogComponent } from './products-dialog/products-dialog.component';
import { AlertService } from '../../../../core/services/alert.service';
import { TableColumns } from '../../../shared/components/table/models/table-columns';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent {
  dataSource: Product[] = [];
  tableColumns: TableColumns[] = [];

  constructor(
    private productsService: ProductsService,
    public matDialog: MatDialog,
    private alertService: AlertService
  ) {
    this.loadProducts();
    this.setTableColumns();
  }
  setTableColumns() {
    this.tableColumns = [
      {
        label: 'IMAGEN',
        def: 'productImage',
        dataKey: 'productImage',
        dataType: 'data',
        type: 'image',
      },
      { label: 'ID', def: '_id', dataKey: '_id', dataType: 'data' },
      {
        label: 'NOMBRE',
        def: 'productName',
        dataKey: 'productName',
        dataType: 'data',
      },
      {
        label: 'CATEGORIA',
        def: 'productCategory',
        dataKey: 'productCategory',
        dataType: 'data',
      },
      {
        label: 'PRECIO',
        def: 'productPrice',
        dataKey: 'productPrice',
        dataType: 'data',
      },
      {
        label: 'CREADO',
        def: 'createdAt',
        dataKey: 'createdAt',
        dataType: 'data',
      },
      {
        label: 'STOCK',
        def: 'productStock',
        dataKey: 'productStock',
        dataType: 'data',
      },
      {
        label: 'DESCRIPCION',
        def: 'productDescription',
        dataKey: 'productDescription',
        dataType: 'data',
      },
    ];
  }
  loadProducts() {
    this.productsService.getProducts().subscribe({
      next: (products) => {
        this.dataSource = products;
      },
    });
  }
  onSelect(data: any) {
    console.log(data, 'onSelect');
  }
  onAction(data: any) {
    if (data.action === 'edit') {
      this.onEditProduct(data.row);
    } else if (data.action === 'delete') {
      this.onDeleteProduct(data.row._id);
    } else if (data.action === 'add') {
      this.openDialog();
    }
  }
  openDialog(): void {
    this.matDialog.open(ProductsDialogComponent).afterClosed().subscribe({
        next: (result) => {
          if (result) {
            this.productsService.createProduct(result).subscribe({
              next: (product) => {
                this.loadProducts();
              },
              complete: () => {
                this.alertService.showSuccessAlert('Se agrego el producto');
              },
            });
          }
        },
      });
  }
  onDeleteProduct(data: string): void {
    this.alertService.showDeleteConfirmation().then((confirmed) => {
      if (confirmed) {
        this.productsService.deleteProduct(data).subscribe({
          next: (result) => {
            this.dataSource = result;
          },
          complete: () => {
            this.alertService.showSuccessAlert('Se elimino el producto');
          },
          error: (err) => {
            this.alertService.showErrorAlert('Error al eliminar el proyecto');
          },
        });
      }
    });
  }
  onEditProduct(product: Product): void {
    this.matDialog
      .open(ProductsDialogComponent, {
        data: product,
      })
      .afterClosed()
      .subscribe({
        next: (result) => {
          if (result) {
            this.productsService.updateProduct(product._id, result).subscribe({
              next: (product) => {
                this.dataSource = product;
              },
              complete: () => {
                this.alertService.showSuccessAlert('Se actualizo el producto');
              },
              error: (err) => {
                this.alertService.showErrorAlert(
                  'Error al actualizar el producto'
                );
              },
            });
          }
        },
      });
  }
}
